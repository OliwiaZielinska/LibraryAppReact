import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { BookResponseDto, CreateBookDto } from './dto/book.dto';
import { CreateLoanDto, LoanResponseDto } from './dto/loan.dto';
import { CreateUserDto } from './dto/user.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8081',
    });
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/auth/login',
        data,
      );
      const token = response.data?.token; // Dostęp do tokenu z odpowiedzi, przy użyciu operatora bezpiecznego wybierania '?'
      if (token) {
        localStorage.setItem('token', token); // Zapisz token do localStorage, jeśli istnieje
      } else {
        throw new Error('Token not found in response'); // Rzuć błąd, jeśli token nie istnieje
      }

      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      console.log('Received response:', response);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBooks(): Promise<ClientResponse<BookResponseDto | null>> {
    try {
      // Pobierz token z localStorage
      const token = localStorage.getItem('token') as string;

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await this.client.get('/books/getAll');
      console.log('Received response:', response);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(): Promise<ClientResponse<LoanResponseDto | null>> {
    try {
      // Pobierz token z localStorage
      const token = localStorage.getItem('token') as string;

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await this.client.get('/loans/getAll');
      console.log('Received response:', response);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addBooks(data: CreateBookDto): Promise<ClientResponse<any>> {
    try {
      const payload = {
        ...data,
      };

      console.log('Sending POST request to addDoctor with data:', payload);

      // Pobierz token z localStorage
      const token = localStorage.getItem('token') as string;

      if (!token) {
        throw new Error('Token not found');
      }

      const response: AxiosResponse<any> = await this.client.post(
        '/books/create',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Received response:', response);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('Error occurred during addDoctor request:', axiosError);

      if (axiosError.response) {
        console.error('Response data:', axiosError.response.data);
        console.error('Response status:', axiosError.response.status);
        console.error('Response headers:', axiosError.response.headers);
      }

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
  public async addUser(data: CreateUserDto): Promise<ClientResponse<any>> {
    try {
      // Pobierz token z localStorage
      const token = localStorage.getItem('token') as string;

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await this.client.post('/auth/register');
      console.log('Received response:', response);

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
