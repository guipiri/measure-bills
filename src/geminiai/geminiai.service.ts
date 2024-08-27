import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFileSync } from 'node:fs';
import { GEMINI_MODEL, GEMINI_SYSTEM_INSTRUCTIONS } from 'src/constants';

@Injectable()
export class GeminiaiService {
  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');

    this.genAI = new GoogleGenerativeAI(apiKey);

    this.fileManager = new GoogleAIFileManager(apiKey);

    this.model = this.genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      generationConfig: this.generationConfig,
      systemInstruction: GEMINI_SYSTEM_INSTRUCTIONS,
    });
  }
  private genAI: GoogleGenerativeAI;
  private fileManager: GoogleAIFileManager;
  private model: GenerativeModel;
  private filePath = __dirname + '/image.jpeg';

  private generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };

  private base64ToJPEG(base64: string) {
    const buffer = Buffer.from(base64, 'base64');
    writeFileSync(this.filePath, buffer, { encoding: 'base64' });
  }

  private async uploadFileToGemini() {
    try {
      const uploadResult = await this.fileManager.uploadFile(this.filePath, {
        mimeType: 'image/jpeg',
        displayName: this.filePath,
      });
      const file = uploadResult.file;
      return file;
    } catch (error) {
      console.log(error);
    }
  }

  async run(base64String: string) {
    this.base64ToJPEG(base64String);
    const file = await this.uploadFileToGemini();

    const result = await this.model.generateContent([
      {
        fileData: {
          fileUri: file.uri,
          mimeType: file.mimeType,
        },
      },
    ]);

    return result.response.text();
  }
}
