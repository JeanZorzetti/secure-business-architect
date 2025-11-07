import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { ContactsList } from './pages/contacts/ContactsList';
import { ContactDetail } from './pages/contacts/ContactDetail';
import { NewsletterList } from './pages/newsletter/NewsletterList';
import { NotFound } from './pages/NotFound';
import { useAuthStore } from './stores/authStore';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Placeholder routes - to be implemented */}
          <Route
            path="/leads"
            element={
              <PrivateRoute>
                <div className="flex h-screen items-center justify-center">
                  <p className="text-2xl text-muted-foreground">
                    Página de Leads em desenvolvimento...
                  </p>
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsList />
              </PrivateRoute>
            }
          />

          <Route
            path="/contacts/:id"
            element={
              <PrivateRoute>
                <ContactDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/newsletter"
            element={
              <PrivateRoute>
                <NewsletterList />
              </PrivateRoute>
            }
          />

          <Route
            path="/blog"
            element={
              <PrivateRoute>
                <div className="flex h-screen items-center justify-center">
                  <p className="text-2xl text-muted-foreground">
                    Página de Blog em desenvolvimento...
                  </p>
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/services"
            element={
              <PrivateRoute>
                <div className="flex h-screen items-center justify-center">
                  <p className="text-2xl text-muted-foreground">
                    Página de Serviços em desenvolvimento...
                  </p>
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/testimonials"
            element={
              <PrivateRoute>
                <div className="flex h-screen items-center justify-center">
                  <p className="text-2xl text-muted-foreground">
                    Página de Depoimentos em desenvolvimento...
                  </p>
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <div className="flex h-screen items-center justify-center">
                  <p className="text-2xl text-muted-foreground">
                    Página de Configurações em desenvolvimento...
                  </p>
                </div>
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
