import React from 'react';
import { ProfileForm } from '../components/profile/ProfileForm';

export default function Profile() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ProfileForm />
      </div>
    </div>
  );
}