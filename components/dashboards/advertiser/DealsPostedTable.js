import React, { useEffect, useState } from 'react';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../../../lib/firebase';

const transactions = [
  {
    id: 'AAPS0L',
    company: 'Chase & Co.',
    share: 'CAC',
    commission: '+$4.37',
    price: '$3,509.00',
    quantity: '12.00',
    netAmount: '$4,397.00',
  },
  
  // More transactions...
]

const DealsPostedTable = ({ user }) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {

    const dealsRef = ref(db, 'deals');
    const dealsQuery = query(dealsRef, orderByChild('advertiserId'), equalTo(user.id));

    const dealsSnapshot = await get(dealsQuery);

    if (dealsSnapshot.exists()) {
      setDeals(Object.values(dealsSnapshot.val()));
    }
  };

  return (

    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Your unique affiliate links!</h1>
          <p className="mt-2 text-sm text-gray-700">
            A table of placeholder stock market data that does not make any sense.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export
          </button>
        </div>
      </div>



      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            
          <div className="overflow-hidden bg-white p-4 ring-1 ring-black ring-opacity-5 sm:rounded-lg">

            <table className="min-w-full divide-y  ">
            <thead className="bg-gray-50" >
                <tr>
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    UniqueLink to use in your content
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Affiliate partner
                  </th>
                  
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Commision %
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Click throughs
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Purchases driven
                  </th>
                  <th
                    scope="col"
                    className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Date link generated
                  </th>
                  <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {deals.map((deal) => (
                  <tr key={deal.id}>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{deal.title}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{deal.shopurl}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{deal.commission}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{deal.clicks}</td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{deal.purchaseEvents}</td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{deal.dateCreated}</td>

                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {deal.id}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DealsPostedTable;