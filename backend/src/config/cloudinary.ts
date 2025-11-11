import { v2 as cloudinary } from 'cloudinary';
import env from './env';

/**
 * Configuração do Cloudinary
 */
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Upload de imagem para o Cloudinary
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  options: {
    folder?: string;
    filename?: string;
    transformation?: any;
  } = {}
): Promise<{
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}> {
  const { folder = 'blog', filename, transformation } = options;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename,
        transformation,
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Upload failed'));
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        });
      }
    );

    uploadStream.end(fileBuffer);
  });
}

/**
 * Deletar imagem do Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

/**
 * Gerar thumbnail no Cloudinary (via URL transformation)
 */
export function getCloudinaryThumbnailUrl(
  publicId: string,
  width: number = 300,
  height: number = 300
): string {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    fetch_format: 'auto',
  });
}

/**
 * Otimizar imagem no Cloudinary (via URL transformation)
 */
export function getCloudinaryOptimizedUrl(publicId: string): string {
  return cloudinary.url(publicId, {
    quality: 'auto:good',
    fetch_format: 'auto',
  });
}

export default cloudinary;
