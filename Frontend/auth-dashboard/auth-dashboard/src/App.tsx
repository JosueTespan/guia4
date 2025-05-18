import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './routes/AppRoute'; 

function App() {
    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <BrowserRouter>
                <AppRoute /> {}
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;
