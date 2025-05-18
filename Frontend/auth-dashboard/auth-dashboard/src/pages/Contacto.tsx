// src/page/main/Contactos.tsx
import { useState, useEffect } from 'react';
import { type Contacto } from '../hook/useContactos';
import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

interface ContactosProps {
    contactos: Contacto[];
    loading: boolean;
    error: string | null;
}

export default function Contactos({ contactos, loading, error }: ContactosProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const formatDate = (dateString: string | null | undefined): string => {
        if (!dateString) return 'N/A';
        
        try {
            let date = parseISO(dateString);
            if (isValid(date)) {
                return format(date, 'dd/MM/yyyy', { locale: es });
            }
            
            date = new Date(dateString);
            if (isValid(date)) {
                return format(date, 'dd/MM/yyyy', { locale: es });
            }
            
            if (!isNaN(Number(dateString))) {
                date = new Date(Number(dateString));
                if (isValid(date)) {
                    return format(date, 'dd/MM/yyyy', { locale: es });
                }
            }
            
            return dateString; 
        } catch (error) {
            console.error('Error formateando fecha:', dateString, error);
            return dateString; 
        }
    };

    const filtered = contactos.filter(c => 
        `${c.nombre} ${c.apellido}`
            .toLowerCase()
            .includes(searchTerm.trim().toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const startIdx = (currentPage - 1) * itemsPerPage;
    const pageData = filtered.slice(startIdx, startIdx + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, itemsPerPage]);

    if (loading) return <p className="p-6 text-center">Cargando contactos...</p>;
    if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Contactos</h2>
            <input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-4 px-3 py-2 border rounded w-full md:w-1/3"
            />

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Apellido</th>
                            <th className="px-4 py-2">Categoría</th>
                            <th className="px-4 py-2">Empresa</th>
                            <th className="px-4 py-2">Fecha Nac.</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {pageData.map(c => (
                            <tr key={c.idcontacto} className="hover:bg-gray-50">
                                <td className="px-4 py-2">{c.idcontacto}</td>
                                <td className="px-4 py-2">{c.nombre}</td>
                                <td className="px-4 py-2">{c.apellido}</td>
                                <td className="px-4 py-2">{c.idcategoria}</td>
                                <td className="px-4 py-2">{c.idempresa}</td>
                                <td className="px-4 py-2">
                                    {formatDate(c.fecha_nacimiento)}
                                </td>
                            </tr>
                        ))}
                        {pageData.length === 0 && (
                            <tr>
                                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                    No se encontraron contactos.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                    <label>Mostrar</label>
                    <select
                        value={itemsPerPage}
                        onChange={e => setItemsPerPage(Number(e.target.value))}
                        className="border rounded px-2 py-1"
                    >
                        {[5, 10, 15, 20].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                    <span>Página {currentPage} de {totalPages}</span>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}