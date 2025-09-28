import { DataDisplay } from '@/components/DataDisplay';
import { GeneratorForm } from '@/components/GeneratorForm';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  return (
    <>
      <main className="min-h-screen w-full font-sans antialiased">
        <ThemeToggle className="fixed top-4 right-4" />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col items-center space-y-16">
            <header className="text-center space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Mirage
              </h1>
              <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                A minimalist, visually stunning web UI to generate realistic fake data for development and testing.
              </p>
            </header>
            <div className="w-full">
              <GeneratorForm />
            </div>
            <div className="w-full">
              <DataDisplay />
            </div>
          </div>
        </div>
        <footer className="py-8 text-center text-gray-500 dark:text-gray-400">
          <p>Powered by Cloudflare</p>
        </footer>
      </main>
      <Toaster richColors closeButton />
    </>
  );
}