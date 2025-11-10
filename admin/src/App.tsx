import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { ContactsList } from './pages/contacts/ContactsList';
import { ContactDetail } from './pages/contacts/ContactDetail';
import { LeadsList } from './pages/leads/LeadsList';
import { LeadCreate } from './pages/leads/LeadCreate';
import { LeadDetail } from './pages/leads/LeadDetail';
import { NewsletterList } from './pages/newsletter/NewsletterList';
import { CampaignsList } from './pages/newsletter/CampaignsList';
import { BlogList } from './pages/blog/BlogList';
import { BlogEditor } from './pages/blog/BlogEditor';
import { ServicesList } from './pages/services/ServicesList';
import TestimonialsList from './pages/testimonials/TestimonialsList';
import { Profile } from './pages/settings/Profile';
import { UsersList } from './pages/users/UsersList';
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

          {/* Leads Routes */}
          <Route
            path="/leads"
            element={
              <PrivateRoute>
                <LeadsList />
              </PrivateRoute>
            }
          />

          <Route
            path="/leads/new"
            element={
              <PrivateRoute>
                <LeadCreate />
              </PrivateRoute>
            }
          />

          <Route
            path="/leads/:id"
            element={
              <PrivateRoute>
                <LeadDetail />
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
            path="/newsletter/campaigns"
            element={
              <PrivateRoute>
                <CampaignsList />
              </PrivateRoute>
            }
          />

          <Route
            path="/blog"
            element={
              <PrivateRoute>
                <BlogList />
              </PrivateRoute>
            }
          />

          <Route
            path="/blog/:id"
            element={
              <PrivateRoute>
                <BlogEditor />
              </PrivateRoute>
            }
          />

          <Route
            path="/services"
            element={
              <PrivateRoute>
                <ServicesList />
              </PrivateRoute>
            }
          />

          <Route
            path="/testimonials"
            element={
              <PrivateRoute>
                <TestimonialsList />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute>
                <UsersList />
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
