import { useEffect, useState } from "react";
import AdminService from "../../api/AdminService";

export default function AdminDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await AdminService.getAllRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      {error && <p className="text-red-600 bg-red-100 p-3 rounded">{error}</p>}

      { restaurants.length > 0 ?
      (<table className="w-full border-collapse border-spacing-0">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Restaurant Name</th>
            <th className="py-2 px-4 text-left">Owner Name</th>
            <th className="py-2 px-4 text-left">Owner Email</th>
            <th className="py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr
              key={restaurant.id}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="py-2 px-4">{restaurant.name}</td>
              <td className="py-2 px-4">{restaurant.owner.name}</td>
              <td className="py-2 px-4"><a href={"mailto:" + restaurant.owner.email} className="hover:text-orange-600 transition">{restaurant.owner.email}</a></td>
              {/* @TODO : create a restaurants/delete/$id back route & function on front */}
              <td className="py-2 px-4"><button className="w-full bg-white text-orange-600 border border-orange-600 hover:bg-red-600 hover:text-white py-2 px-4 rounded transition">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>)
      :
      (
        <p>No restaurants yet</p>
      )}
    </div>
  );
}
