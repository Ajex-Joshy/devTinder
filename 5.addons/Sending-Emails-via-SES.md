import React, { useEffect, useState } from "react";
import BlogTitleCard from "./BlogTitleCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase"; // make sure Firestore is initialized
import { useAuth } from "../utils/AuthProvider"; // assuming you have an Auth context or hook

const MyBlogs = () => {
const [blogs, setBlogs] = useState([]);
const [loading, setLoading] = useState(true);
const { user } = useAuth(); // replace with your actual user context/hook

useEffect(() => {
if (!user) return;

    const fetchMyBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const myBlogsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(myBlogsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchMyBlogs();

}, [user]);

if (loading) return <div>Loading...</div>;
if (blogs.length === 0) return <div>You haven't written any blogs yet.</div>;

return (
<div>
{blogs.map((b) => (
<BlogTitleCard key={b.id} blog={b} myBlog={true} />
))}
</div>
);
};

export default MyBlogs;
