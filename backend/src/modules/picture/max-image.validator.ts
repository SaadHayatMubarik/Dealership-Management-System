import {
    PipeTransform,
    Injectable,
    PayloadTooLargeException,
  } from '@nestjs/common';
  
  @Injectable()
  export class MaxImageSizeValidator implements PipeTransform {
    private readonly maxSizeInBytes: number;
    private readonly fileIsRequired: boolean;
  
    constructor(options?: { fileIsRequired?: boolean }) {
      const oneKb = 1000;
      this.maxSizeInBytes = oneKb * oneKb;
      this.fileIsRequired = options?.fileIsRequired ?? true;
    }
    transform(
      files: Express.Multer.File[] | Express.Multer.File,
    ): Express.Multer.File | Express.Multer.File[] | null {
      if (!files) {
        if (!this.fileIsRequired) {
          return null;
        }
        throw new PayloadTooLargeException('No file provided.');
      }
  
      if (Array.isArray(files)) {
        for (const file of files) {
          this.validateFile(file);
        }
      } else {
        this.validateFile(files);
      }
  
      return files;
    }
  
    private validateFile(file: Express.Multer.File) {
      const check = file.size <= this.maxSizeInBytes;
      if (!check) {
        throw new PayloadTooLargeException(
          `File size exceeds the maximum allowed size of 1 MB.`,
        );
      }
    }
  }
  