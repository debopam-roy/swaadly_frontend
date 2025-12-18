'use client';

import Image from 'next/image';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  maxQuantity?: number;
  minQuantity?: number;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity = 99,
  minQuantity = 1,
}: QuantitySelectorProps) {
  const canDecrease = quantity > minQuantity;
  const canIncrease = quantity < maxQuantity;

  return (
    <div className="flex items-center gap-4 w-full">
      <span className="font-medium text-lg md:text-xl whitespace-nowrap">
        Quantity
      </span>

      <div className="flex items-center border-2 border-shadow rounded-full overflow-hidden flex-1">
        <button
          onClick={onDecrease}
          disabled={!canDecrease}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
          aria-label="Decrease quantity"
        >
          <Image src="/images/remove.svg" alt="Decrease" width={20} height={20} />
        </button>

        <span className="flex-1 text-center text-lg md:text-xl">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          disabled={!canIncrease}
          className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-shadow transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Image src="/images/add.svg" alt="Increase" width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
