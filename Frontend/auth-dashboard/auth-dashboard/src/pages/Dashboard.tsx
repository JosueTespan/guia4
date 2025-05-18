import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaSignOutAlt, FaAddressBook, FaChartLine, FaCog, FaPlus } from 'react-icons/fa';
import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import Contactos from './Contacto';
import { useContactos } from '../hook/useContactos';
import '../dash.css';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [view, setView] = useState<'dashboard' | 'contactos'>('dashboard');
    const { contactos, loading, error } = useContactos();

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

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Gestión de Contactos</h1>
                <div className="user-info">
                    <span className="user-name">{user?.name}</span>
                    <img 
                        src={user?.picture} 
                        alt="Avatar" 
                        className="user-avatar"
                    />
                    <button 
                        onClick={logout} 
                        className="settings-button"
                    >
                        <FaSignOutAlt />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </header>

            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h1 className="sidebar-title">ByteCode</h1>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        onClick={() => setView('dashboard')}
                        className={`nav-item ${view === 'dashboard' ? 'active' : ''}`}
                    >
                        <FaChartLine className="nav-icon" />
                        <span>Dashboard</span>
                    </button>
                    <button 
                        onClick={() => setView('contactos')}
                        className={`nav-item ${view === 'contactos' ? 'active' : ''}`}
                    >
                        <FaAddressBook className="nav-icon" />
                        <span>Contactos</span>
                    </button>
                    <button className="nav-item">
                        <FaCog className="nav-icon" />
                        <span>Configuración</span>
                    </button>
                </nav>
            </aside>

            <main className="dashboard-main">
                {view === 'dashboard' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className="section-title">Resumen</h2>
                            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
                                <FaPlus />
                                <span>Nuevo Contacto</span>
                            </button>
                        </div>

                        <div className="cards-grid">
                            <div className="card">
                                <h3 className="card-title">Total Contactos</h3>
                                <p className="card-value">{contactos.length}</p>
                            </div>
                            <div className="card">
                                <h3 className="card-title">Categorías Diferentes</h3>
                                <p className="card-value">
                                    {new Set(contactos.map(c => c.idcategoria)).size}
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="card-title">Empresas Diferentes</h3>
                                <p className="card-value">
                                    {new Set(contactos.map(c => c.idempresa)).size}
                                </p>
                            </div>
                        </div>

                        <div className="card">
                            <div className="table-header">
                                <h3 className="table-title">Últimos Contactos</h3>
                            </div>
                            <div className="overflow-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Categoría</th>
                                            <th>Empresa</th>
                                            <th>Fecha Nacimiento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contactos.slice(0, 5).map(e => (
                                            <tr key={e.idcontacto}>
                                                <td>{e.nombre}</td>
                                                <td>{e.apellido}</td>
                                                <td>{e.idcategoria}</td>
                                                <td>{e.idempresa}</td>
                                                <td>{formatDate(e.fecha_nacimiento)}</td>
                                            </tr>
                                        ))}
                                        {contactos.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="text-center">No hay contactos registrados</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'contactos' && (
                    <Contactos contactos={contactos} loading={loading} error={error} />
                )}
            </main>
        </div>
    );
}