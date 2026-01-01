'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/contexts/cart.context';
import { productsService } from '@/lib/services/products.service';
import type { Product } from '@/lib/types/product.types';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, className = '', isActive = false, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-[#CB8435] text-base lg:text-lg px-4 lg:px-6 h-full flex items-center transition-colors whitespace-nowrap ${
        isActive
          ? 'bg-[rgba(255,126,41,0.1)] text-[#FF7E29]'
          : 'hover:text-[#A66929] hover:bg-[rgba(203,132,53,0.05)]'
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
      <Image 
        src={icon} 
        alt={alt} 
        width={width} 
        height={height}
        className="object-contain"
      />
      {badge !== undefined && badge > 0 && (
        <span 
          className="absolute -top-2 -right-2 bg-[#FF7E29] text-white text-xs font-semibold rounded-full min-w-5 h-5 px-1 flex items-center justify-center shadow-sm"
          aria-label={`${badge} items`}
        >
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </div>
  );

  const baseClassName = `relative flex items-center justify-center px-3 transition-colors ${
    fullHeight ? 'h-full' : ''
  } ${
    isActive ? 'bg-[rgba(255,126,41,0.1)]' : ''
  } hover:bg-[rgba(203,132,53,0.05)] ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClassName} aria-label={ariaLabel || alt}>
        {iconElement}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className={baseClassName} 
      aria-label={ariaLabel || alt}
      type="button"
    >
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
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      className={`text-[#CB8435] text-base lg:text-lg flex items-center gap-2 px-4 lg:px-6 h-full transition-colors whitespace-nowrap ${
        isActive
          ? 'bg-[rgba(255,126,41,0.1)] text-[#FF7E29]'
          : 'hover:text-[#A66929] hover:bg-[rgba(203,132,53,0.05)]'
      } ${className}`}
    >
      <span>{label}</span>
      <Image
        src="/images/down_arrow.svg"
        alt=""
        width={10}
        height={10}
        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
    <div
      className="absolute top-full left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
      role="menu"
      aria-label="Products menu"
    >
      <div className="py-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
        {products.map((product) => {
          const isActive = pathname === `/products/${product.slug}`;
          return (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={onClose}
              role="menuitem"
              className={`block px-4 py-2.5 text-[#C17C3C] transition-colors ${
                isActive 
                  ? 'bg-[rgba(255,126,41,0.1)] text-[#FF7E29] font-medium' 
                  : 'hover:bg-[#F5EDE0]'
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
      className={`flex items-center gap-3 px-4 py-3 text-[#CB8435] font-medium rounded-lg transition-colors ${
        isActive 
          ? 'bg-[rgba(255,126,41,0.1)] text-[#FF7E29]' 
          : 'hover:bg-[#F5EDE0]'
      }`}
    >
      {icon && (
        <div className="relative shrink-0">
          <Image src={icon} alt="" width={24} height={24} />
          {badge !== undefined && badge > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#FF7E29] text-white text-[10px] font-semibold rounded-full min-w-4 h-4 flex items-center justify-center px-1">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </div>
      )}
      <span>{children}</span>
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
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Menu content */}
      <div className="relative bg-white px-4 pt-4 pb-6 space-y-2 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
        <button
          onClick={onToggleProducts}
          type="button"
          aria-expanded={isProductsOpen}
          className="w-full flex items-center justify-between px-4 py-3 text-[#CB8435] font-medium rounded-lg transition-colors hover:bg-[#F5EDE0]"
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
          <div className="w-full flex flex-col space-y-1 pl-4">
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
        <MobileMenuItem 
          href="/about" 
          isActive={pathname === '/about'} 
          onClick={onClose}
        >
          About us
        </MobileMenuItem>
        <MobileMenuItem 
          href="/faqs" 
          isActive={pathname === '/faqs'} 
          onClick={onClose}
        >
          FAQs
        </MobileMenuItem>
        <div className="border-t border-gray-200 my-4" />
        <MobileMenuItem 
          href="/profile" 
          icon="/images/profile.svg" 
          isActive={pathname === '/profile'} 
          onClick={onClose}
        >
          Profile
        </MobileMenuItem>
        <MobileMenuItem 
          href="/cart" 
          icon="/images/cart.svg" 
          isActive={pathname === '/cart'} 
          badge={itemCount} 
          onClick={onClose}
        >
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

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false);
      }
    }

    if (isProductsDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isProductsDropdownOpen]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsProductsDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsProductsDropdownOpen(prev => !prev);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileProducts = useCallback(() => {
    setIsMobileProductsOpen(prev => !prev);
  }, []);

  return (
    <nav className="bg-white border-b border-[#be7833] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" aria-label="Swaadly Home">
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
              ariaLabel="Search products"
              fullHeight
            />
            <IconButton
              icon="/images/profile.svg"
              alt="Profile"
              href="/profile"
              ariaLabel="View profile"
              isActive={pathname === '/profile'}
              fullHeight
            />
            <IconButton
              icon="/images/cart.svg"
              alt="Cart"
              href="/cart"
              ariaLabel={`Shopping cart with ${itemCount} items`}
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
              ariaLabel="Search products"
              width={24}
              height={24}
            />
            <button
              onClick={toggleMobileMenu}
              className="text-[#C68642] p-2 hover:bg-[rgba(203,132,53,0.05)] rounded-lg transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              <Image
                src={
                  isMobileMenuOpen
                    ? '/images/close.svg'
                    : '/images/hamburger.svg'
                }
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        products={products}
        isProductsOpen={isMobileProductsOpen}
        onToggleProducts={toggleMobileProducts}
        pathname={pathname}
        itemCount={itemCount}
        onClose={closeMobileMenu}
      />
    </nav>
  );
}