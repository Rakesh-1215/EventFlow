// 1. React ke hooks: useState (data yaad rakhne ke liye), useEffect (page load hone par code chalane ke liye)
import { useState, useEffect } from "react";

// 2. Router tools: useParams (URL se ID lene ke liye), useNavigate (page badalne ke liye)
import { useParams, useNavigate } from "react-router-dom";

// 3. API calls: Backend se data mangne ke liye (axios)
import axios from "axios";

// 4. Toast notifications: Success/Error dikhane ke liye (jaise "Event Updated!")
import { toast } from "react-toastify";

// 5. Backend URL: Tere API ka address
import { API_BASE_URL } from "../api";


const EditEvent = () => {
    // 🔹 Step A: URL se Event ID nikalna
    // Jab user /events/50/edit pe jayega, toh id = "50" mil jayegi
    const { id } = useParams();

    // 🔹 Step B: Navigate tool (Wapas jane ke liye)
    const navigate = useNavigate();

    // 🔹 Step C: Data rakhne ke liye State (Bucket)
    // Shuru mein sab khali hoga, baad mein backend se bharega
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        location: "",
        country: "",
        date: "",
    });


    // 🔹 Step D: Loading aur Error state
    const [loading, setLoading] = useState(false);       // Button dabane par "Saving..." dikhane ke liye
    const [fetchLoading, setFetchLoading] = useState(true); // Page load hote waqt "Loading..." dikhane ke liye
    const [errors, setErrors] = useState({});            // Validation errors (jaise "Title required")

    // 🔹 Step E: Agar ID nahi mili toh kuch mat dikha (Security check)
    if (!id) {
        return <div className="text-red-500 text-center mt-10">Error: Event ID missing!</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: "" })
        }
    };

    // 🔹 Step D (New): Page load hote hi data fetch karna
    useEffect(() => {
        const fetchEventData = async () => {
            try {
                // Backend se data mangna
                const res = await axios.get(`${API_BASE_URL}/api/events/${id}`);

                // Data mil gaya! Ab form ko fill karo
                setFormData(res.data);

                // Loading band karo
                setFetchLoading(false);
            } catch (err) {
                console.error("Error fetching event:", err);
                toast.error("Error in loading event data!");
                navigate(-1); // Wapas bhej do agar data nahi mila
            }
        };

        fetchEventData();
    }, [id, navigate]); // Jab bhi ID change ho, yeh code chalega


    // 🔹 Step E (New): Form submit karna (Update Event)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Page refresh mat hone de

        // 1. Validation (Check karo ki sab fields bhare hain ya nahi)
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Event title is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.price || Number(formData.price) < 0) newErrors.price = "Valid price is required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.date) newErrors.date = "Date is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Agar error hai toh ruk ja
        }

        // 2. Loading on karo
        setLoading(true);

        try {
            // 3. Backend ko PUT request bhejo (Update karo)
            const payload = { ...formData, price: Number(formData.price) };
            if (!payload.image) delete payload.image; // Khali image delete kar do

            await axios.put(`${API_BASE_URL}/api/events/${id}`, payload);

            // 4. Success!
            toast.success("Event is updated successfully!");
            navigate(`/events/${id}`); // Wapas details page par jao
        } catch (err) {
            // 5. Error handling
            const msg = err.response?.data?.message || "Something went wrong!";
            toast.error(msg);
            setErrors({ submit: msg }); // Agar koi general error hai
        } finally {
            // 6. Loading band karo
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center py-10 px-4 bg-gray-50 min-h-screen">
            <div className="w-full max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-3xl font-extrabold text-gray-900">
                        Edit Your Event
                    </h3>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        &larr; Back
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 "
                >
                    {/* Title */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Event Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Summer Music Festival"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition`}
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Describe what makes this event special..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                        )}
                    </div>

                    {/* Image URL & Preview */}
                    <div className="mb-5">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Image URL
                        </label>
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                name="image"
                                placeholder="https://images.unsplash.com/..."
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                value={formData.image}
                                onChange={handleChange}
                            />
                            {formData.image && (
                                <div className="h-12 w-20 rounded-md overflow-hidden border border-gray-200 shadow-sm shrink-0">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.src =
                                                "https://via.placeholder.com/150?text=Invalid+URL";
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (₹)
                            </label>
                            <input
                                name="price"
                                min="0"
                                placeholder="0"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition`}
                                value={formData.price}
                                onChange={handleChange}
                            />
                            {errors.price && (
                                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                City/Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Jaipur"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                value={formData.location}
                                onChange={handleChange}
                            />
                            {errors.location && (
                                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Country
                            </label>
                            <input
                                type="text"
                                name="country"
                                placeholder="India"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                value={formData.country}
                                onChange={handleChange}
                            />{errors.country && (
                                <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Event Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 transition`}
                                value={formData.date}
                                onChange={handleChange}
                            />
                            {errors.date && (
                                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full md:w-auto px-8 py-3 rounded-lg! font-bold text-white transition shadow-md ${loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 active:transform active:scale-95"
                            }`}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;