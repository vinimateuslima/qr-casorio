import axios from 'axios';

export interface Convidado {
  _id: string;
  nome: string;
  parentesco: string;
  senha: string;
  status: boolean;
}

export interface NovoConvidado {
  nome: string;
  parentesco: string;
  status?: boolean;
}

export interface ValidarSenha {
  senha: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const api = {
  async listarConvidados(): Promise<Convidado[]> {
    const response = await fetch(`${API_URL}/convidados`);
    if (!response.ok) {
      throw new Error('Erro ao buscar convidados');
    }
    return response.json();
  },

  async cadastrarConvidado(dados: NovoConvidado): Promise<Convidado> {
    const response = await fetch(`${API_URL}/convidados`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });
    if (!response.ok) {
      throw new Error('Erro ao cadastrar convidado');
    }
    return response.json();
  },

  async atualizarConvidado(id: string, dados: NovoConvidado): Promise<Convidado> {
    const response = await fetch(`${API_URL}/convidados/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar convidado');
    }
    return response.json();
  },

  async deletarConvidado(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/convidados/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar convidado');
    }
  },

  async validarSenha({ senha }: { senha: string }) {
    try {
      const response = await axios.post(`${API_URL}/convidados/validar`, { senha });
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.mensagem || 'Senha inválida');
      }
      throw new Error('Erro ao validar a senha');
    }
  },
}; 