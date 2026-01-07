'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { userService } from '@/lib/services/user.service';
import type { UserProfile } from '@/lib/types/user.types';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    displayName: '',
    dateOfBirth: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getCurrentUser();
        setProfile(data.profile);
        setEmail(data.auth.email || '');
        setPhone(data.auth.phone || '');
        setAvatarPreview(data.profile.avatarUrl || '');

        // Format date for input type="date"
        let formattedDate = '';
        if (data.profile.dateOfBirth) {
          const date = new Date(data.profile.dateOfBirth);
          formattedDate = date.toISOString().split('T')[0];
        }

        setFormData({
          firstName: data.profile.firstName || '',
          lastName: data.profile.lastName || '',
          displayName: data.profile.displayName || '',
          dateOfBirth: formattedDate,
        });
      } catch (err) {
        toast.error('Failed to load profile');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Store file for upload on save
    setSelectedFile(file);
    toast.success('Photo selected. Click "Save changes" to upload.');
  };

  const getInitials = () => {
    const first = formData.firstName?.charAt(0) || '';
    const last = formData.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'U';
  };

  const uploadProfilePhoto = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    setIsUploadingPhoto(true);
    try {
      const result = await userService.uploadProfilePhoto(selectedFile);
      return result.avatarUrl;
    } catch (error) {
      console.error('Photo upload error:', error);
      throw error;
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.firstName?.trim()) {
      toast.error('First name is required');
      return;
    }
    if (!formData.lastName?.trim()) {
      toast.error('Last name is required');
      return;
    }
    if (!email && !phone) {
      toast.error('Email or phone number is required');
      return;
    }

    setIsSaving(true);

    try {
      // Upload photo first if selected
      if (selectedFile) {
        toast.loading('Uploading photo...', { id: 'photo-upload' });
        await uploadProfilePhoto();
        toast.success('Photo uploaded successfully!', { id: 'photo-upload' });
      }

      // Format date for backend (ISO string)
      const updatePayload: any = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        displayName: formData.displayName.trim() || undefined,
      };

      if (formData.dateOfBirth) {
        updatePayload.dateOfBirth = formData.dateOfBirth;
      }

      await userService.updateProfile(updatePayload);
      toast.success('Profile updated successfully!');

      setTimeout(() => {
        router.push('/profile');
      }, 1000);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <div className="text-base md:text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors mb-4 md:mb-6"
            type="button"
          >
            <svg
              className="mr-2 h-5 w-5 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm md:text-base font-medium">Update Profile</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl md:rounded-3xl bg-white shadow-sm p-6 md:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-[#D4A574] flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={handlePhotoClick}
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl md:text-3xl lg:text-4xl font-semibold">
                      {getInitials()}
                    </span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <button
                type="button"
                onClick={handlePhotoClick}
                className="mt-3 md:mt-4 text-xs md:text-sm text-[#6B8E23] hover:text-[#556B1A] font-medium transition-colors underline"
              >
                Change Photo
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5 md:space-y-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                  placeholder="Arpit"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                  placeholder="Sharma"
                  required
                />
              </div>

              {/* Display Name */}
              <div>
                <label
                  htmlFor="displayName"
                  className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                >
                  Display Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                  placeholder="arpit_sharma"
                />
              </div>

              {/* Email Address (Read-only) */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  readOnly
                  className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-gray-50 px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-600 cursor-not-allowed"
                  placeholder="arpit.sharma@example.com"
                />
              </div>

              {/* Phone Number (Read-only) */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  readOnly
                  className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-gray-50 px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-600 cursor-not-allowed"
                  placeholder="+91 98765 43210"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 md:space-y-4 pt-2 md:pt-4">
              <button
                type="submit"
                disabled={isSaving || isUploadingPhoto}
                className="w-full rounded-xl md:rounded-2xl bg-[#6B8E23] hover:bg-[#556B1A] disabled:bg-[#6B8E23]/60 disabled:cursor-not-allowed px-6 py-3.5 md:py-4 text-sm md:text-base font-semibold text-white transition-all shadow-sm hover:shadow-md"
              >
                {isSaving || isUploadingPhoto ? 'Saving changes...' : 'Save changes'}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving || isUploadingPhoto}
                className="w-full rounded-xl md:rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3.5 md:py-4 text-sm md:text-base font-semibold text-gray-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
