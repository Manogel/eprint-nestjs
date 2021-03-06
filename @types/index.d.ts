import { JwtPayloadDto } from '@modules/auth/dtos/jwtpayload-dto';
import { Request } from 'express';

declare global {
  interface IMyRequest extends Request {
    user: JwtPayloadDto;
  }

  interface IFile {
    /** Name of the form field associated with this file. */
    fieldname: string;
    /** Name of the file on the uploader's computer. */
    originalname: string;
    /**
     * Value of the `Content-Transfer-Encoding` header for this file.
     * @deprecated since July 2015
     * @see RFC 7578, Section 4.7
     */
    encoding: string;
    /** Value of the `Content-Type` header for this file. */
    mimetype: string;
    /** Size of the file in bytes. */
    size: number;
    /** `DiskStorage` only: Directory to which this file has been uploaded. */
    destination: string;
    /** `DiskStorage` only: Name of this file within `destination`. */
    filename: string;
    /** `DiskStorage` only: Full path to the uploaded file. */
    path: string;
    /** `MemoryStorage` only: A Buffer containing the entire file. */
    buffer: Buffer;
  }

  interface IReturnPaginated<T> {
    page: number;
    pages: number;
    perPage: number;
    total: number;
    data: T[];
  }

  interface IPaginateRequired {
    page: number;
    perPage: number;
  }

  interface IPaginate {
    page?: number;
    perPage?: number;
  }

  type ISortColumn = 'ASC' | 'DESC';

  type ITypeOrmQuery = {
    where?: {
      [column: string]: any;
    };
    sort?: {
      [column: string]: number;
    };
    page: number;
    perPage: number;
  };

  enum Role {
    User = 'user',
    Admin = 'admin',
  }
}
