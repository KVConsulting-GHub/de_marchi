import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface DocValidationResult {
  tipo:     string | null;  // ex: "Contrato Social", "Cartão CNPJ"
  cnpj:     string | null;
  validade: string | null;
  confianca: number;        // 0–1
  erro?:    string;
}

export async function validateDocument(
  fileBuffer: Buffer,
  mimeType: string
): Promise<DocValidationResult> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Você é um assistente de validação de documentos contábeis.
Analise o documento enviado e extraia as seguintes informações em JSON:
- tipo: tipo do documento (ex: "Contrato Social", "Cartão CNPJ", "Procuração", "Inscrição Estadual", "Outro")
- cnpj: CNPJ encontrado no documento (somente números, 14 dígitos) ou null
- validade: data de validade se existir no formato DD/MM/AAAA ou null
- confianca: sua confiança na extração, de 0 a 1

Retorne SOMENTE o JSON, sem explicações adicionais.
Exemplo: {"tipo":"Cartão CNPJ","cnpj":"12345678000199","validade":null,"confianca":0.97}`;

    const result = await model.generateContent([
      {
        inlineData: {
          data:     fileBuffer.toString("base64"),
          mimeType,
        },
      },
      prompt,
    ]);

    const text = result.response.text().trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Resposta do Gemini não contém JSON válido");

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      tipo:      parsed.tipo     ?? null,
      cnpj:      parsed.cnpj     ?? null,
      validade:  parsed.validade ?? null,
      confianca: parsed.confianca ?? 0,
    };
  } catch (err) {
    return {
      tipo: null, cnpj: null, validade: null, confianca: 0,
      erro: err instanceof Error ? err.message : "Erro desconhecido",
    };
  }
}

export function validarCNPJ(cnpj: string): boolean {
  const digits = cnpj.replace(/\D/g, "");
  if (digits.length !== 14) return false;
  if (/^(\d)\1+$/.test(digits)) return false;

  const calc = (d: string, pos: number[]) =>
    pos.reduce((acc, p, i) => acc + parseInt(d[i]) * p, 0) % 11;

  const pos1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pos2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const r1 = calc(digits, pos1);
  const d1 = r1 < 2 ? 0 : 11 - r1;

  const r2 = calc(digits, pos2);
  const d2 = r2 < 2 ? 0 : 11 - r2;

  return parseInt(digits[12]) === d1 && parseInt(digits[13]) === d2;
}
