import { useState, useEffect } from 'react';
import { fetchClient } from '../api/FetchClient';

export interface Contacto {
    idcontacto: number;
    nombre: string;
    apellido: string;
    idcategoria: number;
    idempresa: number;
    fecha_nacimiento: string;
}

export function useContactos() {
    const [state, setState] = useState<{
        contactos: Contacto[];
        loading: boolean;
        error: string | null;
    }>({
        contactos: [],
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClient<Contacto[]>('/api/contacto/', { 
                    method: 'GET',
                });
                setState({
                    contactos: data,
                    loading: false,
                    error: null
                });
            } catch {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    error: 'Error al cargar contactos'
                }));
            }
        };
        fetchData();
    }, []);

    return state;
}

