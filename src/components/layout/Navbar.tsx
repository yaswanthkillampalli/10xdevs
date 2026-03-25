import { UserCircle } from "lucide-react";

interface NavbarProps {
  user: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
}

export default function Navbar({ user }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl leading-none">
            10x
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight">Devs</span>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
          <span className="text-blue-600 cursor-pointer">Dashboard</span>
          <span className="hover:text-gray-900 cursor-pointer transition">Projects</span>
          <span className="hover:text-gray-900 cursor-pointer transition">R&D</span>
          <span className="hover:text-gray-900 cursor-pointer transition">Community</span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize mt-1">{user.role}</p>
          </div>
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className="h-10 w-10 rounded-full border" />
          ) : (
            <UserCircle className="h-10 w-10 text-gray-400" />
          )}
        </div>
      </div>
    </nav>
  );
}