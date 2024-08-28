import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GEMINI_MODEL, GEMINI_SYSTEM_INSTRUCTIONS } from 'src/constants';
import { ImagesService } from 'src/images/images.service';

@Injectable()
export class GeminiaiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly imageService: ImagesService,
  ) {
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

  private generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };

  private async uploadFileToGemini(filePath: string) {
    try {
      const uploadResult = await this.fileManager.uploadFile(filePath, {
        mimeType: 'image/jpeg',
        displayName: filePath,
      });
      const file = uploadResult.file;
      return file;
    } catch (error) {
      console.log(error);
    }
  }

  async run(
    base64String: string,
    measure_uuid: string,
  ): Promise<{ total: string | number }> {
    const filePath = this.imageService.base64ToJPEG(base64String, measure_uuid);

    const file = await this.uploadFileToGemini(filePath);

    const result = await this.model.generateContent([
      {
        fileData: {
          fileUri: file.uri,
          mimeType: file.mimeType,
        },
      },
    ]);

    return JSON.parse(result.response.text());
  }
}
