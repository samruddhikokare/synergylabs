import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, user }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        address: {
            street: '',
            city: '',
        },
        company: '',
        website: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({ ...user, username: `USER-${user.username}` });
        }
    }, [user]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name || formData.name.length < 3) {
            newErrors.name = 'Name is required and must be at least 3 characters.';
        }
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            newErrors.email = 'Valid email is required.';
        }
        const phonePattern = /^[0-9]{10}$/;
        if (!formData.phone || !phonePattern.test(formData.phone)) {
            newErrors.phone = 'Valid phone number is required.';
        }
        if (!formData.address.street || !formData.address.city) {
            newErrors.address = 'Street and city are required.';
        }
        if (formData.company && formData.company.length < 3) {
            newErrors.company = 'Company name must be at least 3 characters if provided.';
        }
        if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
            newErrors.website = 'Valid URL is required if provided.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <span>{errors.name}</span>}
            <input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <span>{errors.email}</span>}
            <input
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            {errors.phone && <span>{errors.phone}</span>}
            <input
                type="text"
                value={`USER-${formData.username}`}
                readOnly
            />
            <input
                type="text"
                placeholder="Street"
                value={formData.address.street}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
            />
            <input
                type="text"
                placeholder="City"
                value={formData.address.city}
                onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
            />
            {errors.address && <span>{errors.address}</span>}
            <input
                type="text"
                placeholder="Company (Optional)"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            />
            {errors.company && <span>{errors.company}</span>}
            <input
                type="text"
                placeholder="Website (Optional)"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            {errors.website && <span>{errors.website}</span>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;
