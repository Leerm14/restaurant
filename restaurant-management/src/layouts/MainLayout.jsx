import Header from "../components/Header";
import Footer from "../components/Footer";
export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
}
