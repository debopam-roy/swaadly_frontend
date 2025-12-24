'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/contexts/cart.context';
import { productsService } from '@/lib/services/products.service';
import type { Product } from '@/lib/types/product.types';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

function NavLink({ href, children, className = '', isActive = false }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-[#CB8435] text-lg px-6 py-6 transition-colors ${
        isActive
          ? 'bg-[rgba(255,126,41,0.1)] text-[#FF7E29]'
          : 'hover:text-[#A66929]'
      } ${className}`}
    >
      {children}
    </Link>
  );
}

interface IconButtonProps {
  icon: string;
  alt: string;
  onClick?: () => void;
  href?: string;
  width?: number;
  height?: number;
  className?: string;
  ariaLabel?: string;
  isActive?: boolean;
  fullHeight?: boolean;
  badge?: number;
}

function IconButton({
  icon,
  alt,
  onClick,
  href,
  width = 20,
  height = 20,
  className = '',
  ariaLabel,
  isActive = false,
  fullHeight = false,
  badge,
}: IconButtonProps) {
  const iconElement = (
    <div className="relative">
      <Image src={icon} alt={alt} width={width} height={height} />
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#FF7E29] text-white text-xs font-medium rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
  );

  const baseClassName = `relative flex items-center px-3 transition-colors ${
    fullHeight ? 'h-full' : ''
  } ${
    isActive ? 'bg-[rgba(255,126,41,0.1)]' : ''
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClassName} aria-label={ariaLabel}>
        {iconElement}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClassName} aria-label={ariaLabel}>
      {iconElement}
    </button>
  );
}

interface DropdownButtonProps {
  label: string;
  className?: string;
  isOpen?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

function DropdownButton({ label, className = '', isOpen = false, isActive = false, onClick }: DropdownButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-[#CB8435] text-lg flex items-center gap-2 px-6 h-full transition-colors ${
        isActive
          ? 'bg-[rgba(255,126,41,0.1)] text-[#FF7E29]'
          : 'hover:text-[#A66929]'
      } ${className}`}
    >
      <span>{label}</span>
      <Image
        src="/images/down_arrow.svg"
        alt=""
        width={10}
        height={10}
        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
}

interface ProductsDropdownProps {
  products: Product[];
  isOpen: boolean;
  pathname: string;
  onClose: () => void;
}

function ProductsDropdown({ products, isOpen, pathname, onClose }: ProductsDropdownProps) {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="py-2">
        {products.map((product) => {
          const isActive = pathname === `/products/${product.slug}`;
          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={onClose}
              className={`block px-4 py-2 text-[#C17C3C] transition-colors ${
                isActive ? 'bg-[rgba(255,126,41,0.1)]' : 'hover:bg-[#F5EDE0]'
              }`}
            >
              {product.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

interface MobileMenuItemProps {
  href: string;
  icon?: string;
  children: React.ReactNode;
  isActive?: boolean;
  badge?: number;
  onClick?: () => void;
}

function MobileMenuItem({ href, icon, children, isActive = false, badge, onClick }: MobileMenuItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-3 py-2 text-[#CB8435] font-medium rounded-md transition-colors ${
        isActive ? 'bg-[rgba(255,126,41,0.1)]' : 'hover:bg-[#F5EDE0]'
      }`}
    >
      {icon && (
        <div className="relative">
          <Image src={icon} alt="" width={24} height={24} />
          {badge !== undefined && badge > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#F5E6D3] text-[#C68642] text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {badge}
            </span>
          )}
        </div>
      )}
      {children}
    </Link>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  products: Product[];
  isProductsOpen: boolean;
  onToggleProducts: () => void;
  pathname: string;
  itemCount: number;
  onClose: () => void;
}

function MobileMenu({
  isOpen,
  products,
  isProductsOpen,
  onToggleProducts,
  pathname,
  itemCount,
  onClose,
}: MobileMenuProps) {
  // Disable body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 top-16 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Menu content */}
      <div className="relative bg-white px-4 pt-2 pb-3 space-y-1 shadow-lg">
        <button
          onClick={onToggleProducts}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[#CB8435] font-medium rounded-md transition-colors hover:bg-[#F5EDE0]"
        >
          <span>Our products</span>
          <Image
            src="/images/down_arrow.svg"
            alt=""
            width={12}
            height={12}
            className={`transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isProductsOpen && products.length > 0 && (
          <div className="w-full flex flex-col">
            {products.map((product) => (
              <MobileMenuItem
                key={product.id}
                href={`/products/${product.slug}`}
                isActive={pathname === `/products/${product.slug}`}
                onClick={onClose}
              >
                {product.name}
              </MobileMenuItem>
            ))}
          </div>
        )}
        <MobileMenuItem href="/about" isActive={pathname === '/about'} onClick={onClose}>
          About us
        </MobileMenuItem>
        <MobileMenuItem href="/faqs" isActive={pathname === '/faqs'} onClick={onClose}>
          FAQs
        </MobileMenuItem>
        <MobileMenuItem href="/profile" icon="/images/profile.svg" isActive={pathname === '/profile'} onClick={onClose}>
          Profile
        </MobileMenuItem>
        <MobileMenuItem href="/cart" icon="/images/cart.svg" isActive={pathname === '/cart'} badge={itemCount} onClick={onClose}>
          Cart
        </MobileMenuItem>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsService.getProducts({
          isActive: true,
          sortBy: 'displayOrder',
          sortOrder: 'asc',
        });
        setProducts(response.products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  return (
    <nav className="bg-white border-b border-[#be7833]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.svg"
                alt="Swaadly Logo"
                width={80}
                height={50}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center h-full">
            <div
              ref={dropdownRef}
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <DropdownButton
                label="Our products"
                isOpen={isProductsDropdownOpen}
                isActive={pathname.startsWith('/products')}
                onClick={toggleDropdown}
              />
              {!isLoadingProducts && (
                <ProductsDropdown
                  products={products}
                  isOpen={isProductsDropdownOpen}
                  pathname={pathname}
                  onClose={() => setIsProductsDropdownOpen(false)}
                />
              )}
            </div>
            <NavLink href="/about" isActive={pathname === '/about'}>
              About us
            </NavLink>
            <NavLink href="/faqs" isActive={pathname === '/faqs'}>
              FAQs
            </NavLink>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center h-full">
            <IconButton
              icon="/images/search.svg"
              alt="Search"
              ariaLabel="Search"
              fullHeight
            />
            <IconButton
              icon="/images/profile.svg"
              alt="Profile"
              href="/profile"
              ariaLabel="Profile"
              isActive={pathname === '/profile'}
              fullHeight
            />
            <IconButton
              icon="/images/cart.svg"
              alt="Cart"
              href="/cart"
              ariaLabel="Cart"
              isActive={pathname === '/cart'}
              fullHeight
              badge={itemCount}
            />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <IconButton
              icon="/images/search.svg"
              alt="Search"
              ariaLabel="Search"
              width={32}
              height={32}
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#C68642]"
              aria-label="Menu"
            >
              <Image
                src={
                  isMobileMenuOpen
                    ? '/images/close.svg'
                    : '/images/hamburger.svg'
                }
                alt="Menu"
                width={32}
                height={32}
              />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        products={products}
        isProductsOpen={isMobileProductsOpen}
        onToggleProducts={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
        pathname={pathname}
        itemCount={itemCount}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
}
