export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
      <footer className="bg-gray-200 text-center p-4 text-sm">
        © 2025 Restaurant Management
      </footer>
    </div>
  );
}
