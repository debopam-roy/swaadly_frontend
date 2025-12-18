'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/lib/contexts/cart.context';
import { productsService } from '@/lib/services/products.service';
import type { Product } from '@/lib/types/product.types';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

function NavLink({ href, children, className = '' }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-[#C17C3C] font-medium hover:text-[#A66929] transition-colors ${className}`}
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
}: IconButtonProps) {
  const iconElement = (
    <Image src={icon} alt={alt} width={width} height={height} />
  );

  const baseClassName = `text-shadow hover:text-[#A66929] transition-colors ${className}`;

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
}

function DropdownButton({ label, className = '', isOpen = false }: DropdownButtonProps) {
  return (
    <button
      className={`text-[#C17C3C] font-medium flex items-center space-x-2 hover:text-[#A66929] transition-colors ${className}`}
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
}

function ProductsDropdown({ products, isOpen }: ProductsDropdownProps) {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-[/images/background_footer.vsvg] border border-gray-200 rounded-lg shadow-lg z-50">
      <div className="py-2">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="block px-4 py-2 text-[#C17C3C] hover:bg-[#F5EDE0] transition-colors"
          >
            {product.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

interface MobileMenuItemProps {
  href: string;
  icon?: string;
  children: React.ReactNode;
}

function MobileMenuItem({ href, icon, children }: MobileMenuItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2 text-[#C17C3C] font-medium hover:bg-[#F5EDE0] rounded-md"
    >
      {icon && (
        <Image src={icon} alt="" width={16} height={16} className="mr-2" />
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
}

function MobileMenu({
  isOpen,
  products,
  isProductsOpen,
  onToggleProducts,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-[#FDF6ED] border-t border-gray-200">
      <div className="px-4 pt-2 pb-3 space-y-1">
        <button
          onClick={onToggleProducts}
          className="w-full text-left px-3 py-2"
        >
          <DropdownButton
            label="Our products"
            className="w-full justify-between"
            isOpen={isProductsOpen}
          />
        </button>
        {isProductsOpen && products.length > 0 && (
          <div className="pl-6 space-y-1">
            {products.map((product) => (
              <MobileMenuItem
                key={product.id}
                href={`/products/${product.slug}`}
              >
                {product.name}
              </MobileMenuItem>
            ))}
          </div>
        )}
        <MobileMenuItem href="/about">About us</MobileMenuItem>
        <MobileMenuItem href="/profile" icon="/images/account.svg">
          Profile
        </MobileMenuItem>
        <MobileMenuItem href="/cart" icon="/images/cart.svg">
          Cart
        </MobileMenuItem>
      </div>
    </div>
  );
}

export default function Navbar() {
  const { itemCount } = useCart();
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

  return (
    <nav className="bg-white border-b border-gray-200">
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
          <div className="hidden md:flex items-center space-x-8 font-bold">
            <div
              className="relative"
              onMouseEnter={() => setIsProductsDropdownOpen(true)}
              onMouseLeave={() => setIsProductsDropdownOpen(false)}
            >
              <DropdownButton
                label="Our products"
                isOpen={isProductsDropdownOpen}
              />
              {!isLoadingProducts && (
                <ProductsDropdown
                  products={products}
                  isOpen={isProductsDropdownOpen}
                />
              )}
            </div>
            <NavLink href="/about">About us</NavLink>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <IconButton
              icon="/images/search.svg"
              alt="Search"
              ariaLabel="Search"
            />
            <IconButton
              icon="/images/account.svg"
              alt="Account"
              href="/profile"
              ariaLabel="Profile"
            />
            <Link href="/cart" className="relative" aria-label="Cart">
              <Image
                src="/images/cart.svg"
                alt="Cart"
                width={20}
                height={20}
              />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF7E29] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <IconButton
              icon="/images/search.svg"
              alt="Search"
              ariaLabel="Search"
              className="text-[#C17C3C]"
            />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#C17C3C]"
              aria-label="Menu"
            >
              <Image
                src={
                  isMobileMenuOpen
                    ? '/images/close.svg'
                    : '/images/hamburger.svg'
                }
                alt="Menu"
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
        onToggleProducts={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
      />
    </nav>
  );
}
