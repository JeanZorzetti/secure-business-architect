import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { LoadingSpinner } from './components/common/LoadingSpinner';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { useAuthStore } from './stores/authStore';

// Eager load critical routes
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';

// Lazy load other routes
const ContactsList = lazy(() =>
  import('./pages/contacts/ContactsList').then((m) => ({
    default: m.ContactsList,
  }))
);
const ContactDetail = lazy(() =>
  import('./pages/contacts/ContactDetail').then((m) => ({
    default: m.ContactDetail,
  }))
);
const LeadsList = lazy(() =>
  import('./pages/leads/LeadsList').then((m) => ({ default: m.LeadsList }))
);
const LeadCreate = lazy(() =>
  import('./pages/leads/LeadCreate').then((m) => ({ default: m.LeadCreate }))
);
const LeadDetail = lazy(() =>
  import('./pages/leads/LeadDetail').then((m) => ({ default: m.LeadDetail }))
);
const NewsletterList = lazy(() =>
  import('./pages/newsletter/NewsletterList').then((m) => ({
    default: m.NewsletterList,
  }))
);
const CampaignsList = lazy(() =>
  import('./pages/newsletter/CampaignsList').then((m) => ({
    default: m.CampaignsList,
  }))
);
const BlogList = lazy(() =>
  import('./pages/blog/BlogList').then((m) => ({ default: m.BlogList }))
);
const BlogEditor = lazy(() =>
  import('./pages/blog/BlogEditor').then((m) => ({ default: m.BlogEditor }))
);
const ServicesList = lazy(() =>
  import('./pages/services/ServicesList').then((m) => ({
    default: m.ServicesList,
  }))
);
const TestimonialsList = lazy(() =>
  import('./pages/testimonials/TestimonialsList').then((m) => ({
    default: m.default,
  }))
);
const Profile = lazy(() =>
  import('./pages/settings/Profile').then((m) => ({ default: m.Profile }))
);
const Settings = lazy(() =>
  import('./pages/settings/Settings').then((m) => ({ default: m.Settings }))
);
const UsersList = lazy(() =>
  import('./pages/users/UsersList').then((m) => ({ default: m.UsersList }))
);
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound }))
);

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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster />
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <LoadingSpinner size="lg" text="Carregando..." />
              </div>
            }
          >
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

          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
