// components/InvestmentCard.tsx

import React from 'react';
import { Investment } from '@/types';

interface InvestmentCardProps {
  investment: Investment;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-2">{investment.propertyName}</h3>
      <p className="text-gray-600 mb-4">{investment.propertyAddress}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Invested Amount</p>
          <p className="font-bold">${investment.investedAmount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Current Value</p>
          <p className="font-bold">${investment.currentValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tokens Owned</p>
          <p className="font-bold">{investment.tokensOwned}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Returns</p>
          <p className={`font-bold ${investment.returns >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {investment.returns >= 0 ? '+' : '-'}${Math.abs(investment.returns).toLocaleString()}
          </p>
        </div>
      </div>
      <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
        Manage Investment
      </button>
    </div>
  );
};

export default InvestmentCard;