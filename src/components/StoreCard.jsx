export default function StoreCard({ store, userRating, onRate }) {
    return (
      <div className="border p-4 rounded-lg shadow-md mb-4 bg-white">
        <h2 className="text-lg font-semibold">{store.name}</h2>
        <p className="text-sm text-gray-700">{store.address}</p>
        <p className="mt-2">⭐ Overall Rating: {parseFloat(store.rating).toFixed(1)}</p>
        {userRating !== undefined && (
          <p className="text-sm">Your Rating: {userRating}</p>
        )}
        {onRate && (
          <button
            onClick={() => onRate(store.id)}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Rate This Store
          </button>
        )}
      </div>
    );
  }
  