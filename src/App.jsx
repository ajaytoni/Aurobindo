import { useEffect, useState } from "react";

// =====================================================
// SCHOOL LOGO
// =====================================================

import schoolLogo from "./image.png";

// =====================================================
// HOME + ABOUT IMAGES
// =====================================================

import homeImage from "./au.jpg.jpeg";
import aboutImage from "./au1.jpg.jpeg";

// =====================================================
// GALLERY IMAGES
// =====================================================

import galleryImage1 from "./au2.jpg.jpeg";
import galleryImage2 from "./au3.jpg.jpeg";
import galleryImage3 from "./au4.jpg.jpeg";
import galleryImage4 from "./au5.jpg.jpeg";
import galleryImage5 from "./au6.jpg.jpeg";
import galleryImage6 from "./au7.jpg.jpeg";
import galleryImage7 from "./au8.jpg.jpeg";
import galleryImage8 from "./au9.jpg.jpeg";
import galleryImage9 from "./au10.jpg.jpeg";
import galleryImage10 from "./au11.jpg.jpeg";
import galleryImage11 from "./au12.jpg.jpeg";
import galleryImage12 from "./au13.jpg.jpeg";

// =====================================================
// FACILITIES IMAGES
// =====================================================

import facilityClassroom from "./class.jpg";
import facilityTeachers from "./au11.jpg.jpeg";
import facilityEnvironment from "./en.jpg";
import facilityPlayground from "./play_grounds.jpg";
import facilityLearning from "./learning.jpg";
import facilityPersonal from "./personal.jpg";

// =====================================================
// SCHOOL DETAILS
// =====================================================

const schoolName = "Aurobindo's Kakatiya Secondary School";
const schoolPhone = "9959261196";
const schoolEmail = "Aurobindo@117gmail.com";
const whatsappNumber = "919959261196";

// =====================================================
// GALLERY PASSWORD
// =====================================================

const GALLERY_PASSWORD = "Aurobindo@123";
const STORAGE_KEY = "aurobindokakatiya_local_gallery";

// =====================================================
// GALLERY
// =====================================================

const localGallery = [
  { id: "gallery-1", name: "School Gallery 1", src: galleryImage1 },
  { id: "gallery-2", name: "School Gallery 2", src: galleryImage2 },
  { id: "gallery-3", name: "School Gallery 3", src: galleryImage3 },
  { id: "gallery-4", name: "School Gallery 4", src: galleryImage4 },
  { id: "gallery-5", name: "School Gallery 5", src: galleryImage5 },
  { id: "gallery-6", name: "School Gallery 6", src: galleryImage6 },
  { id: "gallery-7", name: "School Gallery 7", src: galleryImage7 },
  { id: "gallery-8", name: "School Gallery 8", src: galleryImage8 },
  { id: "gallery-9", name: "School Gallery 9", src: galleryImage9 },
  { id: "gallery-10", name: "School Gallery 10", src: galleryImage10 },
  { id: "gallery-11", name: "School Gallery 11", src: galleryImage11 },
  { id: "gallery-12", name: "School Gallery 12", src: galleryImage12 },
];

// =====================================================
// FACILITIES
// =====================================================

const facilities = [
  {
    title: "Modern Classrooms",
    text: "Well-designed classrooms provide a comfortable and focused learning environment for every student.",
    image: facilityClassroom,
  },
  {
    title: "Experienced Teachers",
    text: "Our dedicated teachers guide students with care, knowledge, discipline, and individual attention.",
    image: facilityTeachers,
  },
  {
    title: "Safe Learning Environment",
    text: "We maintain a secure, friendly, and positive environment where students can learn confidently.",
    image: facilityEnvironment,
  },
  {
    title: "Activity-Based Learning",
    text: "Students learn through activities, participation, practical experiences, and creative exploration.",
    image: facilityPlayground,
  },
  {
    title: "Learning Resources",
    text: "Students receive access to useful educational resources that support academic development.",
    image: facilityLearning,
  },
  {
    title: "Personality Development",
    text: "We encourage communication, confidence, discipline, leadership, and positive personal growth.",
    image: facilityPersonal,
  },
];

// =====================================================
// PROGRAMS
// =====================================================

const programs = [
  {
    number: "01",
    title: "Academic Excellence",
    text: "Strong academic foundations with focused classroom teaching and regular assessment.",
  },
  {
    number: "02",
    title: "Concept-Based Learning",
    text: "Students are encouraged to understand concepts clearly instead of depending only on memorization.",
  },
  {
    number: "03",
    title: "Individual Attention",
    text: "Teachers support students according to their learning needs and academic progress.",
  },
  {
    number: "04",
    title: "Creative Activities",
    text: "Creative activities help students develop imagination, confidence, and practical skills.",
  },
  {
    number: "05",
    title: "Sports & Activities",
    text: "Physical activities encourage teamwork, discipline, fitness, and a healthy lifestyle.",
  },
  {
    number: "06",
    title: "Communication Skills",
    text: "Students are encouraged to express themselves clearly and confidently.",
  },
  {
    number: "07",
    title: "Moral Values",
    text: "Respect, responsibility, discipline, honesty, and kindness are encouraged every day.",
  },
  {
    number: "08",
    title: "Leadership Skills",
    text: "Students receive opportunities to develop responsibility and leadership qualities.",
  },
  {
    number: "09",
    title: "Holistic Development",
    text: "Our approach focuses on academic, physical, social, emotional, and personal development.",
  },
];

// =====================================================
// APP
// =====================================================

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [galleryPasswordOpen, setGalleryPasswordOpen] = useState(false);
  const [galleryPassword, setGalleryPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [uploadedPhotos, setUploadedPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Gallery loading error:", error);
      return [];
    }
  });

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const allGalleryPhotos = [...uploadedPhotos, ...localGallery];

  // ===================================================
  // SAVE UPLOADED PHOTOS
  // ===================================================

  const saveUploadedPhotos = (photos) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (error) {
      console.error("Gallery save error:", error);
      alert(
        "The photo could not be saved. Your browser storage may be full."
      );
    }
  };

  // ===================================================
  // COMPRESS IMAGE
  // ===================================================

  const compressImage = (file, maxWidth = 1600, quality = 0.82) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();

        image.onload = () => {
          let width = image.width;
          let height = image.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext("2d");

          context.drawImage(image, 0, 0, width, height);

          resolve(canvas.toDataURL("image/jpeg", quality));
        };

        image.onerror = reject;
        image.src = reader.result;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // ===================================================
  // GALLERY PASSWORD
  // ===================================================

  const openGalleryPassword = () => {
    setGalleryPassword("");
    setPasswordError("");
    setGalleryPasswordOpen(true);
  };

  const closeGalleryPassword = () => {
    setGalleryPassword("");
    setPasswordError("");
    setGalleryPasswordOpen(false);
  };

  const verifyGalleryPassword = () => {
    if (galleryPassword === GALLERY_PASSWORD) {
      setGalleryPasswordOpen(false);
      setGalleryPassword("");
      setPasswordError("");

      setTimeout(() => {
        const uploadInput = document.getElementById(
          "gallery-upload-input"
        );

        if (uploadInput) uploadInput.click();
      }, 100);
    } else {
      setPasswordError("Incorrect password. Please try again.");
    }
  };

  // ===================================================
  // ADD PHOTOS
  // ===================================================

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const newPhotos = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith("image/")) continue;

        const src = await compressImage(file);

        newPhotos.push({
          id: `uploaded-${Date.now()}-${i}`,
          name: file.name,
          src,
          type: "uploaded",
        });

        setUploadProgress(
          Math.round(((i + 1) / files.length) * 100)
        );
      }

      if (newPhotos.length > 0) {
        const updatedPhotos = [...newPhotos, ...uploadedPhotos];

        setUploadedPhotos(updatedPhotos);
        saveUploadedPhotos(updatedPhotos);
      }
    } catch (error) {
      console.error("Photo upload error:", error);
      alert("There was a problem adding the photos.");
    } finally {
      setUploading(false);

      setTimeout(() => {
        setUploadProgress(0);
      }, 800);

      event.target.value = "";
    }
  };

  // ===================================================
  // DELETE SELECTED UPLOADED PHOTO
  // ===================================================

  const deleteSelectedUploadedPhoto = () => {
    if (!selectedImage || selectedImage.type !== "uploaded") return;

    const confirmed = window.confirm(
      "Remove this photo from the gallery?"
    );

    if (!confirmed) return;

    const updatedPhotos = uploadedPhotos.filter(
      (photo) => photo.id !== selectedImage.id
    );

    setUploadedPhotos(updatedPhotos);
    saveUploadedPhotos(updatedPhotos);
    setSelectedImage(null);
  };

  // ===================================================
  // DELETE ALL UPLOADED PHOTOS
  // ===================================================

  const clearUploadedPhotos = () => {
    if (!uploadedPhotos.length) return;

    const confirmed = window.confirm(
      "Remove all added photos from this browser?"
    );

    if (!confirmed) return;

    setUploadedPhotos([]);
    localStorage.removeItem(STORAGE_KEY);
    setSelectedImage(null);
  };

  // ===================================================
  // LIGHTBOX
  // ===================================================

  const openImage = (photo) => {
    setSelectedImage(photo);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  // ===================================================
  // HOME / ABOUT IMAGE LIGHTBOX
  // ===================================================

  const openHomeImage = () => {
    openImage({
      id: "home-image",
      name: schoolName,
      src: homeImage,
      type: "home",
    });
  };

  const openAboutImage = () => {
    openImage({
      id: "about-image",
      name: `About ${schoolName}`,
      src: aboutImage,
      type: "about",
    });
  };

  // ===================================================
  // NAVIGATION
  // ===================================================

  const goToSection = (sectionId) => {
    setMobileMenuOpen(false);

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ===================================================
  // WHATSAPP
  // ===================================================

  const sendWhatsApp = () => {
    const text = `
Hello ${schoolName},

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}
    `.trim();

    const url =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(text);

    window.open(url, "_blank");
  };

  const admissionWhatsApp = () => {
    const text =
      `Hello ${schoolName}, ` +
      `I would like to know more about admission.`;

    const url =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(text);

    window.open(url, "_blank");
  };

  // ===================================================
  // BODY SCROLL LOCK
  // ===================================================

  useEffect(() => {
    document.body.style.overflow =
      selectedImage || galleryPasswordOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage, galleryPasswordOpen]);

  // ===================================================
  // ESCAPE KEY
  // ===================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        setMobileMenuOpen(false);
        closeGalleryPassword();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: Arial, Helvetica, sans-serif;
          background: #f8f3e7;
          color: #172033;
          overflow-x: hidden;
        }

        button,
        input,
        textarea {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        img {
          max-width: 100%;
        }

        .container {
          width: min(1280px, calc(100% - 40px));
          margin: 0 auto;
        }

        section {
          scroll-margin-top: 78px;
        }

        .section {
          padding: 24px 0;
        }

        /* =================================================
           HEADER
        ================================================= */

        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 74px;
          background: rgba(255, 252, 245, 0.97);
          border-bottom: 1px solid rgba(21, 33, 59, 0.1);
          box-shadow: 0 5px 18px rgba(21, 33, 59, 0.07);
          backdrop-filter: blur(10px);
        }

        .header-inner {
          height: 74px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand {
          flex: 0 1 auto;
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .brand:hover {
          transform: translateY(-2px);
        }

        .brand-logo {
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          object-fit: contain;
          border-radius: 50%;
          background: #fff;
          transition: 0.3s ease;
        }

        .brand-logo:hover {
          transform: scale(1.06);
        }

        .brand-text {
          min-width: 0;
        }

        .brand-name {
          color: #15213b;
          font-size: 16px;
          line-height: 1.15;
          font-weight: 800;
          white-space: nowrap;
        }

        .brand-subtitle {
          margin-top: 3px;
          color: #b57916;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.1px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .desktop-nav {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(8px, 1.2vw, 17px);
        }

        .nav-button {
          border: 0;
          background: transparent;
          color: #28334a;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 2px;
          white-space: nowrap;
          transition: 0.25s ease;
        }

        .nav-button:hover {
          color: #b57916;
          transform: translateY(-2px);
        }

        .header-contact {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 8px;
          background: #15213b;
          color: #fff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
          transition: 0.25s ease;
        }

        .header-contact:hover {
          background: #b57916;
          transform: translateY(-2px);
        }

        .menu-button {
          display: none;
          border: 0;
          background: #15213b;
          color: #fff;
          width: 42px;
          height: 42px;
          border-radius: 8px;
          font-size: 22px;
          flex-shrink: 0;
          transition: 0.25s ease;
        }

        .menu-button:hover {
          background: #b57916;
          transform: translateY(-2px);
        }

        .mobile-menu {
          display: none;
        }

        /* =================================================
           COMMON
        ================================================= */

        .section-heading-row {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
          align-items: end;
          gap: 30px;
          margin-bottom: 16px;
        }

        .section-label {
          color: #b57916;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.7px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }

        .section-title {
          color: #15213b;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.08;
          font-weight: 800;
        }

        .section-description {
          color: #5d6678;
          font-size: 13px;
          line-height: 1.65;
          text-align: justify;
          text-justify: inter-word;
          margin: 0;
        }

        .gold-line {
          width: 48px;
          height: 3px;
          margin: 10px 0;
          background: #b57916;
        }

        .hero-text,
        .section-description,
        .about-content p,
        .program-card p,
        .facility-content p,
        .admission-main > p,
        .admission-list-item span,
        .admission-item span,
        .contact-info > p,
        .contact-detail span,
        .contact-detail a,
        .footer p {
          text-align: justify;
          text-justify: inter-word;
          line-height: 1.65;
        }

        /* =================================================
           HOME
        ================================================= */

        .hero {
          min-height: auto;
          display: flex;
          align-items: center;
          padding: 18px 0;
          background: #f8f3e7;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 0.95fr);
          align-items: center;
          gap: 26px;
        }

        .hero-content {
          max-width: 640px;
          width: 100%;
          height: 400px;
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0;
        }

        .hero-label {
          width: 100%;
          max-width: 620px;
          min-height: 58px;
          display: flex;
          align-items: center;
          color: #15213b;
          font-size: 27px;
          line-height: 1.18;
          font-weight: 800;
          letter-spacing: -0.3px;
          margin-bottom: 5px;
        }

        .hero-content .gold-line {
          width: 42px;
          height: 3px;
          margin: 7px 0;
          background: #b57916;
        }

        .hero-text {
          width: 100%;
          max-width: 620px;
          color: #5d6678;
          font-size: 13.5px;
          line-height: 1.58;
          margin: 0;
        }

        .hero-text-second,
        .hero-text-third {
          margin-top: 7px;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }

        .primary-button,
        .secondary-button {
          min-height: 40px;
          padding: 8px 15px;
          border-radius: 8px;
          font-size: 11.5px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .primary-button {
          border: 0;
          background: #15213b;
          color: #fff;
        }

        .primary-button:hover {
          background: #b57916;
          transform: translateY(-3px);
          box-shadow: 0 9px 20px rgba(181, 121, 22, 0.22);
        }

        .secondary-button {
          border: 1px solid rgba(21, 33, 59, 0.18);
          background: transparent;
          color: #15213b;
        }

        .secondary-button:hover {
          background: #15213b;
          color: #fff;
          transform: translateY(-3px);
        }

        .hero-image-frame {
          width: 100%;
          height: 400px;
          min-height: 400px;
          overflow: hidden;
          border-radius: 13px;
          background: #ddd;
          box-shadow: 0 12px 30px rgba(21, 33, 59, 0.13);
          transition: 0.3s ease;
          cursor: pointer;
        }

        .hero-image-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 35px rgba(21, 33, 59, 0.18);
        }

        .hero-image-frame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.5s ease;
          cursor: pointer;
        }

        .hero-image-frame:hover img {
          transform: scale(1.025);
        }

        /* =================================================
           ABOUT
        ================================================= */

        .about {
          background: #fffdf8;
        }

        .about-grid {
          display: grid;
          grid-template-columns: minmax(420px, 0.95fr) minmax(0, 1fr);
          align-items: stretch;
          gap: 30px;
        }

        .about-image-frame {
          width: 100%;
          height: 430px;
          min-height: 430px;
          overflow: hidden;
          border-radius: 14px;
          background: #ddd;
          box-shadow: 0 15px 35px rgba(21, 33, 59, 0.13);
          transition: 0.3s ease;
          cursor: pointer;
        }

        .about-image-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(21, 33, 59, 0.18);
        }

        .about-image-frame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.5s ease;
          cursor: pointer;
        }

        .about-image-frame:hover img {
          transform: scale(1.025);
        }

        .about-content {
          max-width: 640px;
          width: 100%;
          height: 430px;
          min-height: 430px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .about-content .section-description {
          width: 100%;
          max-width: 640px;
          margin: 0;
        }

        .about-content .section-description + .section-description {
          margin-top: 8px !important;
        }

        .about-points {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 9px;
        }

        .about-point {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 11px;
          border-radius: 8px;
          background: #f8f3e7;
          border: 1px solid rgba(21, 33, 59, 0.07);
          transition: 0.25s ease;
        }

        .about-point:hover {
          transform: translateY(-3px);
          border-color: rgba(181, 121, 22, 0.3);
          box-shadow: 0 8px 18px rgba(21, 33, 59, 0.08);
        }

        .about-point strong {
          color: #b57916;
          font-size: 11px;
        }

        .about-point span {
          color: #28334a;
          font-size: 12px;
          font-weight: 700;
        }

        /* =================================================
           PROGRAMS
        ================================================= */

        .programs {
          background: #f8f3e7;
        }

        .program-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          align-items: stretch;
        }

        .program-card {
          min-width: 0;
          min-height: 170px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          background: #fffdf8;
          border: 1px solid rgba(21, 33, 59, 0.08);
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(21, 33, 59, 0.05);
          transition: 0.28s ease;
        }

        .program-card:hover {
          transform: translateY(-5px);
          border-color: rgba(181, 121, 22, 0.4);
          box-shadow: 0 14px 28px rgba(21, 33, 59, 0.12);
        }

        .program-number {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 9px;
          border-radius: 50%;
          background: #15213b;
          color: #d7a74e;
          font-size: 10px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .program-card:hover .program-number {
          background: #b57916;
          color: #fff;
          transform: scale(1.06);
        }

        .program-card h3 {
          min-height: 40px;
          margin-bottom: 6px;
          color: #15213b;
          font-size: 15px;
          line-height: 1.3;
        }

        .program-card p {
          width: 100%;
          margin: 0;
          color: #5d6678;
          font-size: 12.5px;
          line-height: 1.6;
        }

        /* =================================================
           ADMISSION
        ================================================= */

        .admission {
          background: #15213b;
          color: #fff;
        }

        .admission .section-label {
          color: #d7a74e;
        }

        .admission .section-title {
          color: #fff;
        }

        .admission .section-description {
          color: rgba(255, 255, 255, 0.72);
        }

        .admission-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr);
          gap: 18px;
          align-items: stretch;
        }

        .admission-main {
          min-width: 0;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.045);
          transition: 0.28s ease;
        }

        .admission-main:hover {
          border-color: rgba(215, 167, 78, 0.4);
          transform: translateY(-3px);
        }

        .admission-main h3 {
          margin-bottom: 7px;
          color: #fff;
          font-size: 20px;
        }

        .admission-main > p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12.5px;
        }

        .admission-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 14px;
        }

        .admission-list-item {
          min-width: 0;
          min-height: 70px;
          padding: 11px;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.07);
          transition: 0.25s ease;
        }

        .admission-list-item:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-3px);
        }

        .admission-list-item strong {
          flex-shrink: 0;
          color: #d7a74e;
          font-size: 11px;
        }

        .admission-list-item span {
          color: rgba(255, 255, 255, 0.82);
          font-size: 11.5px;
        }

        .admission-side {
          min-width: 0;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }

        .admission-item {
          min-width: 0;
          min-height: 100px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 9px;
          background: #fffdf8;
          color: #15213b;
          transition: 0.25s ease;
        }

        .admission-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.16);
        }

        .admission-item strong {
          margin-bottom: 5px;
          font-size: 14px;
        }

        .admission-item span {
          color: #5d6678;
          font-size: 11.5px;
        }

        .admission-button {
          grid-column: 1 / -1;
          width: 100%;
          min-height: 44px;
          border: 0;
          border-radius: 9px;
          background: #d7a74e;
          color: #15213b;
          font-size: 12px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .admission-button:hover {
          background: #fff;
          transform: translateY(-3px);
        }

        /* =================================================
           FACILITIES
        ================================================= */

        .facilities {
          background: #fffdf8;
        }

        .facility-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .facility-card {
          min-width: 0;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid rgba(21, 33, 59, 0.08);
          border-radius: 11px;
          box-shadow: 0 5px 15px rgba(21, 33, 59, 0.05);
          transition: 0.28s ease;
        }

        .facility-card:hover {
          transform: translateY(-5px);
          border-color: rgba(181, 121, 22, 0.35);
          box-shadow: 0 15px 30px rgba(21, 33, 59, 0.12);
        }

        .facility-image {
          width: 100%;
          height: 195px;
          flex: 0 0 195px;
          overflow: hidden;
          background: #ddd;
        }

        .facility-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.5s ease;
          cursor: pointer;
        }

        .facility-card:hover .facility-image img {
          transform: scale(1.06);
        }

        .facility-content {
          flex: 1;
          min-height: 140px;
          padding: 13px;
          display: flex;
          flex-direction: column;
        }

        .facility-content h3 {
          min-height: 40px;
          margin-bottom: 7px;
          color: #15213b;
          font-size: 15px;
        }

        .facility-content p {
          color: #5d6678;
          font-size: 12.5px;
        }

        /* =================================================
           GALLERY
        ================================================= */

        .gallery {
          background: #f8f3e7;
        }

        .gallery-toolbar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 7px;
        }

        .upload-button,
        .remove-all-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 38px;
          padding: 8px 13px;
          border-radius: 8px;
          font-size: 11.5px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .upload-button {
          background: #15213b;
          color: #fff;
          cursor: pointer;
        }

        .upload-button:hover {
          background: #b57916;
          transform: translateY(-3px);
        }

        .remove-all-button {
          border: 1px solid rgba(181, 121, 22, 0.35);
          background: #fffdf8;
          color: #15213b;
        }

        .remove-all-button:hover {
          background: #b57916;
          color: #fff;
          transform: translateY(-3px);
        }

        .upload-input {
          display: none;
        }

        .upload-progress {
          width: 100%;
          margin-top: 7px;
          text-align: right;
          color: #b57916;
          font-size: 11px;
          font-weight: 700;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-top: 12px;
        }

        .gallery-card {
          position: relative;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          border-radius: 9px;
          background: #ddd;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(21, 33, 59, 0.07);
          transition: 0.28s ease;
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 13px 28px rgba(21, 33, 59, 0.15);
        }

        .gallery-card img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.45s ease;
        }

        .gallery-card:hover img {
          transform: scale(1.06);
        }

        /* =================================================
           IMPORTANT:
           SHOW HEADS IN AU5, AU8 AND AU13
        ================================================= */

        .gallery-au5,
        .gallery-au8,
        .gallery-au13 {
          object-position: center 20%;
        }

        .gallery-card::after {
          content: "View";
          position: absolute;
          left: 50%;
          bottom: 10px;
          transform: translate(-50%, 10px);
          padding: 6px 11px;
          border-radius: 20px;
          background: rgba(21, 33, 59, 0.88);
          color: #fff;
          font-size: 9px;
          font-weight: 800;
          opacity: 0;
          transition: 0.25s ease;
          pointer-events: none;
        }

        .gallery-card:hover::after {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        /* =================================================
           PASSWORD POPUP
        ================================================= */

        .password-overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(10, 15, 25, 0.78);
          backdrop-filter: blur(6px);
        }

        .password-box {
          position: relative;
          width: min(390px, 100%);
          padding: 28px 24px 24px;
          border-radius: 14px;
          background: #fffdf8;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.28);
          text-align: center;
          animation: passwordPopup 0.25s ease;
        }

        @keyframes passwordPopup {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .password-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border: 0;
          border-radius: 50%;
          background: #f8f3e7;
          color: #15213b;
          font-size: 20px;
        }

        .password-close:hover {
          background: #b57916;
          color: #fff;
          transform: rotate(90deg);
        }

        .password-icon {
          width: 52px;
          height: 52px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #15213b;
          font-size: 22px;
        }

        .password-box h3 {
          margin-bottom: 7px;
          color: #15213b;
          font-size: 21px;
        }

        .password-box p {
          margin-bottom: 17px;
          color: #5d6678;
          font-size: 12px;
          line-height: 1.6;
        }

        .password-box input {
          width: 100%;
          height: 44px;
          padding: 10px 13px;
          border: 1px solid rgba(21, 33, 59, 0.15);
          border-radius: 8px;
          outline: none;
          background: #fff;
          color: #172033;
          font-size: 13px;
        }

        .password-box input:focus {
          border-color: #b57916;
          box-shadow: 0 0 0 3px rgba(181, 121, 22, 0.08);
        }

        .password-error {
          margin-top: 8px;
          color: #c0392b;
          font-size: 11px;
          font-weight: 700;
        }

        .password-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: 15px;
        }

        .password-cancel,
        .password-submit {
          min-height: 40px;
          border-radius: 8px;
          font-size: 11.5px;
          font-weight: 800;
        }

        .password-cancel {
          border: 1px solid rgba(21, 33, 59, 0.15);
          background: transparent;
          color: #15213b;
        }

        .password-submit {
          border: 0;
          background: #15213b;
          color: #fff;
        }

        .password-submit:hover {
          background: #b57916;
          transform: translateY(-2px);
        }

        /* =================================================
           CONTACT
        ================================================= */

        .contact {
          background: #fffdf8;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: 20px;
          align-items: start;
        }

        .contact-info {
          padding: 19px;
          border-radius: 12px;
          background: #15213b;
          color: #fff;
          transition: 0.28s ease;
        }

        .contact-info:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 30px rgba(21, 33, 59, 0.18);
        }

        .contact-info h3 {
          margin-bottom: 8px;
          font-size: 21px;
        }

        .contact-info > p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12.5px;
        }

        .contact-details {
          display: grid;
          gap: 8px;
          margin-top: 14px;
        }

        .contact-detail {
          padding: 12px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.07);
          transition: 0.25s ease;
          text-align: center;
        }

        .contact-detail:hover {
          background: rgba(255, 255, 255, 0.13);
          transform: translateY(-3px);
        }

        .contact-detail strong {
          display: block;
          margin-bottom: 5px;
          color: #d7a74e;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          text-align: center;
        }

        .contact-detail span,
        .contact-detail a {
          display: block;
          color: rgba(255, 255, 255, 0.86);
          font-size: 12px;
          line-height: 1.5;
          text-decoration: none;
          word-break: break-word;
          text-align: center;
        }

        .contact-detail a:hover {
          color: #d7a74e;
        }

        .contact-form {
          padding: 19px;
          border: 1px solid rgba(21, 33, 59, 0.08);
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 6px 18px rgba(21, 33, 59, 0.05);
          transition: 0.28s ease;
        }

        .contact-form:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(21, 33, 59, 0.1);
        }

        .contact-form h3 {
          margin-bottom: 12px;
          color: #15213b;
          font-size: 21px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .form-group {
          margin-bottom: 8px;
        }

        .form-group label {
          display: block;
          margin-bottom: 4px;
          color: #28334a;
          font-size: 10.5px;
          font-weight: 800;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          border: 1px solid rgba(21, 33, 59, 0.13);
          border-radius: 8px;
          outline: none;
          background: #fffdf8;
          color: #172033;
          font-size: 12px;
          padding: 9px 11px;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #b57916;
          box-shadow: 0 0 0 3px rgba(181, 121, 22, 0.08);
        }

        .form-group textarea {
          min-height: 105px;
          resize: vertical;
        }

        .contact-submit {
          width: 100%;
          min-height: 43px;
          border: 0;
          border-radius: 8px;
          background: #15213b;
          color: #fff;
          font-size: 11.5px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .contact-submit:hover {
          background: #b57916;
          transform: translateY(-3px);
        }

        /* =================================================
           FOOTER
        ================================================= */

        .footer {
          background: #101827;
          color: #fff;
          padding: 20px 0 14px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.8fr 1fr;
          gap: 22px;
          align-items: start;
        }

        .footer-brand {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .footer-logo {
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          object-fit: contain;
          border-radius: 50%;
          background: #fff;
          padding: 3px;
          transition: 0.3s ease;
        }

        .footer-logo:hover {
          transform: scale(1.08);
        }

        .footer h3 {
          margin-bottom: 7px;
          color: #fff;
          font-size: 14px;
        }

        .footer p {
          color: rgba(255, 255, 255, 0.65);
          font-size: 11.5px;
        }

        .footer-links {
          display: grid;
          gap: 5px;
        }

        .footer-links button {
          width: max-content;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.7);
          font-size: 11.5px;
          padding: 0;
          transition: 0.2s ease;
        }

        .footer-links button:hover {
          color: #d7a74e;
          transform: translateX(4px);
        }

        .astro-link {
          display: inline-block;
          margin-top: 6px;
          color: #d7a74e;
          text-decoration: none;
          font-size: 11.5px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .astro-link:hover {
          color: #fff;
          transform: translateX(3px);
        }

        .footer-bottom {
          margin-top: 15px;
          padding-top: 11px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
          color: rgba(255, 255, 255, 0.5);
          font-size: 10.5px;
        }

        /* =================================================
           LIGHTBOX
        ================================================= */

        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: rgba(0, 0, 0, 0.92);
        }

        .lightbox-content {
          position: relative;
          width: min(1200px, 100%);
          max-height: calc(100vh - 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .lightbox-image {
          max-width: 100%;
          max-height: calc(100vh - 120px);
          display: block;
          object-fit: contain;
          border-radius: 6px;
        }

        .lightbox-close {
          position: absolute;
          top: -8px;
          right: -8px;
          z-index: 2;
          width: 40px;
          height: 40px;
          border: 0;
          border-radius: 50%;
          background: #fff;
          color: #15213b;
          font-size: 24px;
          line-height: 1;
          transition: 0.25s ease;
        }

        .lightbox-close:hover {
          background: #b57916;
          color: #fff;
          transform: rotate(90deg);
        }

        .lightbox-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .lightbox-title {
          max-width: 70vw;
          color: #fff;
          font-size: 12px;
          text-align: center;
        }

        .lightbox-remove {
          min-height: 38px;
          padding: 8px 13px;
          border: 0;
          border-radius: 7px;
          background: #b57916;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
        }

        /* =================================================
           1100px
        ================================================= */

        @media (max-width: 1100px) {
          .container {
            width: min(100% - 30px, 1100px);
          }

          .brand-name {
            font-size: 14px;
          }

          .brand-subtitle {
            font-size: 8px;
          }

          .desktop-nav {
            gap: 8px;
          }

          .nav-button {
            font-size: 12px;
          }

          .header-contact {
            padding: 9px 11px;
            font-size: 11px;
          }

          .hero {
            padding: 16px 0;
          }

          .hero-grid {
            gap: 22px;
          }

          .hero-content,
          .hero-image-frame {
            height: 380px;
            min-height: 380px;
          }

          .hero-label {
            font-size: 24px;
            min-height: 55px;
          }

          .hero-text {
            font-size: 13px;
          }

          .about-grid {
            gap: 24px;
          }

          .admission-layout {
            grid-template-columns: minmax(0, 1fr) minmax(320px, 0.8fr);
            gap: 16px;
          }
        }

        /* =================================================
           920px
        ================================================= */

        @media (max-width: 920px) {
          .desktop-nav {
            display: flex;
            flex: 1;
            gap: 7px;
            justify-content: flex-end;
          }

          .desktop-nav .nav-button {
            font-size: 11px;
            padding: 7px 1px;
          }

          .header-contact {
            display: none;
          }

          .hero-grid,
          .about-grid {
            grid-template-columns: 1fr;
          }

          .hero-grid {
            gap: 18px;
          }

          .hero-content,
          .about-content {
            max-width: none;
            width: 100%;
            height: auto;
            min-height: auto;
          }

          .hero-image-frame,
          .about-image-frame {
            min-height: auto;
            height: auto;
            aspect-ratio: 16 / 10;
          }

          .programs .section-heading-row,
          .facilities .section-heading-row,
          .admission .section-heading-row {
            grid-template-columns: 1fr;
            gap: 8px;
            align-items: start;
          }

          .program-grid,
          .facility-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .admission-layout {
            grid-template-columns: 1fr;
          }

          .admission-main,
          .admission-side {
            height: auto;
          }

          .contact-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* =================================================
           650px MOBILE
        ================================================= */

        @media (max-width: 650px) {
          .container {
            width: calc(100% - 24px);
          }

          .section {
            padding: 19px 0;
          }

          .header,
          .header-inner {
            height: 70px;
          }

          .header-inner {
            justify-content: space-between;
          }

          .desktop-nav,
          .header-contact {
            display: none !important;
          }

          .brand {
            flex: 1;
            min-width: 0;
          }

          .brand-logo {
            width: 43px;
            height: 43px;
            flex-basis: 43px;
          }

          .brand-name {
            font-size: 12.5px;
          }

          .brand-subtitle {
            font-size: 7px;
            letter-spacing: 0.8px;
          }

          .menu-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-menu {
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            display: grid;
            gap: 2px;
            padding: 8px 12px 10px;
            background: #fffdf8;
            border-bottom: 1px solid rgba(21, 33, 59, 0.1);
            box-shadow: 0 12px 25px rgba(21, 33, 59, 0.1);
          }

          .mobile-menu button {
            width: 100%;
            padding: 10px 12px;
            border: 0;
            border-radius: 7px;
            background: transparent;
            color: #28334a;
            text-align: left;
            font-size: 13px;
            font-weight: 700;
          }

          .mobile-menu button:hover {
            background: #f8f3e7;
            color: #b57916;
            transform: translateX(3px);
          }

          .section-heading-row {
            grid-template-columns: 1fr;
            gap: 7px;
            margin-bottom: 11px;
          }

          .hero {
            min-height: auto;
            padding: 16px 0;
          }

          .hero-grid {
            gap: 14px;
          }

          .hero-content {
            height: auto;
            min-height: auto;
          }

          .hero-label {
            width: 100%;
            max-width: 100%;
            min-height: 48px;
            font-size: 20px;
            line-height: 1.2;
            margin-bottom: 4px;
          }

          .hero-content .gold-line {
            width: 38px;
            height: 2px;
            margin: 6px 0;
          }

          .hero-text {
            font-size: 12px;
            line-height: 1.55;
          }

          .hero-text-second,
          .hero-text-third {
            margin-top: 6px;
          }

          .hero-buttons {
            margin-top: 10px;
            gap: 7px;
          }

          .primary-button,
          .secondary-button {
            min-height: 38px;
            padding: 7px 13px;
            font-size: 11px;
          }

          .hero-image-frame {
            aspect-ratio: 16 / 9;
            border-radius: 11px;
          }

          .about-image-frame {
            min-height: auto;
            height: auto;
            aspect-ratio: 16 / 10;
          }

          .about-content {
            height: auto;
            min-height: auto;
          }

          .about-points {
            grid-template-columns: 1fr;
            gap: 7px;
            margin-top: 8px;
          }

          .program-grid,
          .facility-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .program-card {
            min-height: auto;
            padding: 14px;
          }

          .program-card h3,
          .facility-content h3 {
            min-height: auto;
          }

          .facility-image {
            height: auto;
            flex: 0 0 auto;
            aspect-ratio: 16 / 9;
          }

          .facility-content {
            min-height: auto;
          }

          .admission-list {
            grid-template-columns: 1fr;
            gap: 7px;
            margin-top: 11px;
          }

          .admission-side {
            grid-template-columns: 1fr;
            gap: 7px;
          }

          .admission-item {
            min-height: 78px;
          }

          .admission-button {
            grid-column: auto;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 7px;
            margin-top: 10px;
          }

          .gallery-toolbar {
            justify-content: flex-start;
          }

          .upload-progress {
            text-align: left;
          }

          .password-overlay {
            padding: 14px;
          }

          .password-box {
            width: 100%;
            padding: 25px 18px 19px;
            border-radius: 12px;
          }

          .password-box h3 {
            font-size: 19px;
          }

          .password-box p {
            font-size: 11.5px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .contact-detail {
            text-align: center;
          }

          .contact-detail strong,
          .contact-detail span,
          .contact-detail a {
            text-align: center;
          }

          .footer {
            padding: 18px 0 12px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .footer-brand {
            align-items: center;
            gap: 10px;
          }

          .footer-logo {
            width: 52px;
            height: 52px;
            flex-basis: 52px;
          }

          .lightbox {
            padding: 12px;
          }

          .lightbox-image {
            max-height: calc(100vh - 100px);
          }

          .lightbox-close {
            top: -5px;
            right: -5px;
          }

          .hero-text,
          .section-description,
          .about-content p,
          .program-card p,
          .facility-content p,
          .admission-main > p,
          .admission-list-item span,
          .admission-item span,
          .contact-info > p,
          .footer p {
            text-align: justify;
            text-justify: inter-word;
            line-height: 1.6;
          }

          .contact-detail span,
          .contact-detail a {
            text-align: center;
          }
        }

        /* =================================================
           400px
        ================================================= */

        @media (max-width: 400px) {
          .brand-name {
            font-size: 11.5px;
          }

          .brand-subtitle {
            font-size: 6.5px;
          }

          .hero {
            padding: 14px 0;
          }

          .hero-grid {
            gap: 12px;
          }

          .hero-label {
            min-height: 44px;
            font-size: 18px;
          }

          .hero-text {
            font-size: 11.5px;
            line-height: 1.52;
          }

          .hero-buttons {
            margin-top: 9px;
          }

          .hero-image-frame {
            aspect-ratio: 16 / 9;
          }

          .admission-side {
            grid-template-columns: 1fr;
          }

          .admission-button {
            grid-column: auto;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .password-box {
            padding: 23px 15px 17px;
          }

          .password-actions {
            grid-template-columns: 1fr;
          }
        }

      `}</style>

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="header">
        <div className="container header-inner">

          <div
            className="brand"
            onClick={() => goToSection("home")}
          >
            <img
              className="brand-logo"
              src={schoolLogo}
              alt={schoolName}
            />

            <div className="brand-text">
              <div className="brand-name">
                {schoolName}
              </div>

              <div className="brand-subtitle">
                Education • Values • Excellence
              </div>
            </div>
          </div>

          {/* DESKTOP NAVIGATION - CONTACT REMOVED */}

          <nav className="desktop-nav">

            <button
              className="nav-button"
              onClick={() => goToSection("home")}
            >
              Home
            </button>

            <button
              className="nav-button"
              onClick={() => goToSection("about")}
            >
              About
            </button>

            <button
              className="nav-button"
              onClick={() => goToSection("programs")}
            >
              Programs
            </button>

            <button
              className="nav-button"
              onClick={() => goToSection("admission")}
            >
              Admission
            </button>

            <button
              className="nav-button"
              onClick={() => goToSection("facilities")}
            >
              Facilities
            </button>

            <button
              className="nav-button"
              onClick={() => goToSection("gallery")}
            >
              Gallery
            </button>

          </nav>

          <a
            className="header-contact"
            href={`tel:${schoolPhone}`}
          >
            Call Now
          </a>

          <button
            className="menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? "×" : "☰"}
          </button>

        </div>

        {/* MOBILE MENU - CONTACT REMOVED */}

        {mobileMenuOpen && (
          <div className="mobile-menu">

            <button onClick={() => goToSection("home")}>
              Home
            </button>

            <button onClick={() => goToSection("about")}>
              About
            </button>

            <button onClick={() => goToSection("programs")}>
              Programs
            </button>

            <button onClick={() => goToSection("admission")}>
              Admission
            </button>

            <button onClick={() => goToSection("facilities")}>
              Facilities
            </button>

            <button onClick={() => goToSection("gallery")}>
              Gallery
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.location.href = `tel:${schoolPhone}`;
              }}
            >
              Call Now
            </button>

          </div>
        )}

      </header>

      {/* =================================================
          HOME
      ================================================= */}

      <section id="home" className="hero">
        <div className="container hero-grid">

          <div className="hero-content">

            <div className="hero-label">
              Welcome to {schoolName}
            </div>

            <div className="gold-line" />

            <p className="hero-text">
              {schoolName} is committed to providing
              quality education, strong values,
              discipline, confidence, and holistic
              development for every student.
            </p>

            <p className="hero-text hero-text-second">
              We create a supportive learning
              environment where students are
              encouraged to learn with curiosity,
              develop their talents, build strong
              character, and prepare confidently
              for a successful future.
            </p>

            <p className="hero-text hero-text-third">
              Our goal is to help every child
              discover their strengths, improve
              their knowledge, and grow into a
              responsible and confident individual
              through meaningful learning
              experiences.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={() => goToSection("admission")}
              >
                Admission Enquiry
              </button>

              <button
                className="secondary-button"
                onClick={() => goToSection("about")}
              >
                Discover More
              </button>

            </div>

          </div>

          {/* CLICKABLE HOME IMAGE */}

          <div
            className="hero-image-frame"
            onClick={openHomeImage}
          >
            <img
              src={homeImage}
              alt={schoolName}
            />
          </div>

        </div>
      </section>

      {/* =================================================
          ABOUT
      ================================================= */}

      <section id="about" className="section about">

        <div className="container about-grid">

          {/* CLICKABLE ABOUT IMAGE */}

          <div
            className="about-image-frame"
            onClick={openAboutImage}
          >
            <img
              src={aboutImage}
              alt={`About ${schoolName}`}
            />
          </div>

          <div className="about-content">

            <div className="section-label">
              About Our School
            </div>

            <h2 className="section-title">
              Education with Purpose,
              Values with Vision.
            </h2>

            <div className="gold-line" />

            <p className="section-description">
              {schoolName} believes that education is
              not only about academic success but
              also about developing responsible,
              confident, and disciplined
              individuals.
            </p>

            <p className="section-description">
              We provide students with a
              supportive learning environment where
              they can develop knowledge, creativity,
              communication skills, leadership
              qualities, and strong moral values.
            </p>

            <div className="about-points">

              <div className="about-point">
                <strong>01</strong>
                <span>Quality Education</span>
              </div>

              <div className="about-point">
                <strong>02</strong>
                <span>Experienced Guidance</span>
              </div>

              <div className="about-point">
                <strong>03</strong>
                <span>Holistic Development</span>
              </div>

              <div className="about-point">
                <strong>04</strong>
                <span>Strong Values</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          PROGRAMS
      ================================================= */}

      <section id="programs" className="section programs">

        <div className="container">

          <div className="section-heading-row">

            <div>
              <div className="section-label">
                Our Programs
              </div>

              <h2 className="section-title">
                Learning That Builds Confidence.
              </h2>
            </div>

            <p className="section-description">
              Our educational approach combines
              strong academics with practical
              learning, values, creativity,
              communication, and personal
              development.
            </p>

          </div>

          <div className="program-grid">

            {programs.map((program) => (
              <div
                className="program-card"
                key={program.number}
              >
                <div className="program-number">
                  {program.number}
                </div>

                <h3>{program.title}</h3>

                <p>{program.text}</p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =================================================
          ADMISSION
      ================================================= */}

      <section id="admission" className="section admission">

        <div className="container">

          <div className="section-heading-row">

            <div>
              <div className="section-label">
                Admissions
              </div>

              <h2 className="section-title">
                Start Your Child's Journey With Us.
              </h2>
            </div>

            <p className="section-description">
              We welcome families who are looking
              for a supportive school environment
              focused on education, discipline,
              values, and comprehensive student
              development.
            </p>

          </div>

          <div className="admission-layout">

            <div className="admission-main">

              <h3>Admission Enquiry</h3>

              <p>
                Connect with our school team to
                learn more about the admission
                process, academic programs, school
                environment, and other important
                information.
              </p>

              <div className="admission-list">

                <div className="admission-list-item">
                  <strong>01</strong>
                  <span>
                    Enquire about admission
                    availability and the application
                    process.
                  </span>
                </div>

                <div className="admission-list-item">
                  <strong>02</strong>
                  <span>
                    Understand our academic approach
                    and learning environment.
                  </span>
                </div>

                <div className="admission-list-item">
                  <strong>03</strong>
                  <span>
                    Discuss your child's educational
                    needs with our team.
                  </span>
                </div>

                <div className="admission-list-item">
                  <strong>04</strong>
                  <span>
                    Receive guidance about the next
                    steps for admission.
                  </span>
                </div>

              </div>

            </div>

            <div className="admission-side">

              <div className="admission-item">
                <strong>Academic Focus</strong>
                <span>
                  Strong foundations and focused
                  classroom learning.
                </span>
              </div>

              <div className="admission-item">
                <strong>Student Care</strong>
                <span>
                  Individual attention and supportive
                  guidance.
                </span>
              </div>

              <div className="admission-item">
                <strong>Values</strong>
                <span>
                  Discipline, respect,
                  responsibility, and confidence.
                </span>
              </div>

              <div className="admission-item">
                <strong>Development</strong>
                <span>
                  Academic, creative, physical, and
                  personal growth.
                </span>
              </div>

              <button
                className="admission-button"
                onClick={admissionWhatsApp}
              >
                Enquire on WhatsApp
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          FACILITIES
      ================================================= */}

      <section id="facilities" className="section facilities">

        <div className="container">

          <div className="section-heading-row">

            <div>
              <div className="section-label">
                Our Facilities
              </div>

              <h2 className="section-title">
                A Supportive Place to Learn.
              </h2>
            </div>

            <p className="section-description">
              Our facilities are designed to
              provide students with a comfortable,
              safe, and positive environment for
              learning and development.
            </p>

          </div>

          <div className="facility-grid">

            {facilities.map((facility) => (
              <div
                className="facility-card"
                key={facility.title}
              >

                <div className="facility-image">

                  <img
                    src={facility.image}
                    alt={facility.title}
                    onClick={() =>
                      openImage({
                        id: `facility-${facility.title}`,
                        name: facility.title,
                        src: facility.image,
                        type: "facility",
                      })
                    }
                  />

                </div>

                <div className="facility-content">

                  <h3>{facility.title}</h3>

                  <p>{facility.text}</p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =================================================
          GALLERY
      ================================================= */}

      <section id="gallery" className="section gallery">

        <div className="container">

          <div className="section-heading-row">

            <div>
              <div className="section-label">
                School Gallery
              </div>

              <h2 className="section-title">
                Moments From Our School.
              </h2>
            </div>

            <p className="section-description">
              Explore moments from our school life,
              activities, learning experiences, and
              memorable events.
            </p>

          </div>

          <div className="gallery-toolbar">

            <div
              className="upload-button"
              onClick={() => {
                if (!uploading) openGalleryPassword();
              }}
            >
              {uploading
                ? "Adding Photos..."
                : "Add Photos"}

              <input
                id="gallery-upload-input"
                className="upload-input"
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                disabled={uploading}
              />
            </div>

            {uploadedPhotos.length > 0 && (
              <button
                className="remove-all-button"
                onClick={clearUploadedPhotos}
              >
                Remove Added Photos
              </button>
            )}

          </div>

          {uploadProgress > 0 && (
            <div className="upload-progress">
              {uploadProgress}% added
            </div>
          )}

          <div className="gallery-grid">

            {allGalleryPhotos.map((photo) => {

              const isAu5 =
                photo.src === galleryImage4;

              const isAu8 =
                photo.src === galleryImage7;

              const isAu13 =
                photo.src === galleryImage12;

              return (
                <div
                  className="gallery-card"
                  key={photo.id}
                  onClick={() => openImage(photo)}
                >

                  <img
                    src={photo.src}
                    alt={photo.name}
                    className={
                      isAu5
                        ? "gallery-au5"
                        : isAu8
                        ? "gallery-au8"
                        : isAu13
                        ? "gallery-au13"
                        : ""
                    }
                  />

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =================================================
          CONTACT
      ================================================= */}

      <section id="contact" className="section contact">

        <div className="container">

          <div className="section-heading-row">

            <div>
              <div className="section-label">
                Contact Us
              </div>

              <h2 className="section-title">
                Let's Start a Conversation.
              </h2>
            </div>

            <p className="section-description">
              Contact our school for admissions,
              enquiries, academic information, or
              any other questions.
            </p>

          </div>

          <div className="contact-grid">

            <div className="contact-info">

              <h3>{schoolName}</h3>

              <p>
                We are committed to supporting
                students and families with quality
                education, guidance, values, and a
                positive learning environment.
              </p>

              <div className="contact-details">

                <div className="contact-detail">
                  <strong>Phone</strong>

                  <a href={`tel:${schoolPhone}`}>
                    {schoolPhone}
                  </a>
                </div>

                <div className="contact-detail">
                  <strong>Email</strong>

                  <a href={`mailto:${schoolEmail}`}>
                    {schoolEmail}
                  </a>
                </div>

                <div className="contact-detail">
                  <strong>WhatsApp</strong>

                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="contact-detail">
                  <strong>School</strong>

                  <span>{schoolName}</span>
                </div>

              </div>

            </div>

            <div className="contact-form">

              <h3>Send an Enquiry</h3>

              <div className="form-row">

                <div className="form-group">

                  <label>Name</label>

                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                  />

                </div>

                <div className="form-group">

                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                  />

                </div>

              </div>

              <div className="form-group">

                <label>Phone</label>

                <input
                  type="tel"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                />

              </div>

              <div className="form-group">

                <label>Message</label>

                <textarea
                  placeholder="Write your message"
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                />

              </div>

              <button
                className="contact-submit"
                onClick={sendWhatsApp}
              >
                Send Enquiry on WhatsApp
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <div className="container">

          <div className="footer-grid">

            <div className="footer-brand">

              <img
                className="footer-logo"
                src={schoolLogo}
                alt={schoolName}
              />

              <div className="footer-brand-content">

                <h3>{schoolName}</h3>

                <p>
                  A school committed to quality
                  education, strong values,
                  discipline, confidence, and
                  holistic development.
                </p>

              </div>

            </div>

            <div>

              <h3>Quick Links</h3>

              <div className="footer-links">

                <button onClick={() => goToSection("home")}>
                  Home
                </button>

                <button onClick={() => goToSection("about")}>
                  About
                </button>

                <button onClick={() => goToSection("programs")}>
                  Programs
                </button>

                <button onClick={() => goToSection("admission")}>
                  Admission
                </button>

                <button onClick={() => goToSection("facilities")}>
                  Facilities
                </button>

                <button onClick={() => goToSection("gallery")}>
                  Gallery
                </button>

                <button onClick={() => goToSection("contact")}>
                  Contact
                </button>

              </div>

            </div>

            {/* ASTROIDEA SOFTWAY */}

            <div>

              <h3>Website Development</h3>

              <p>
                Website developed by
                AstroIdea Softway.
              </p>

              <a
                className="astro-link"
                href="https://www.astroideasoftway.com/"
                target="_blank"
                rel="noreferrer"
              >
                AstroIdea Softway
              </a>

            </div>

          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()}{" "}
            {schoolName}. All Rights Reserved.
          </div>

        </div>

      </footer>

      {/* =================================================
          GALLERY PASSWORD POPUP
      ================================================= */}

      {galleryPasswordOpen && (

        <div
          className="password-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeGalleryPassword();
            }
          }}
        >

          <div className="password-box">

            <button
              className="password-close"
              onClick={closeGalleryPassword}
              aria-label="Close"
            >
              ×
            </button>

            <div className="password-icon">
              🔒
            </div>

            <h3>Gallery Access</h3>

            <p>
              Enter the password to add photos
              to the school gallery.
            </p>

            <input
              type="password"
              placeholder="Enter password"
              value={galleryPassword}
              autoFocus
              onChange={(event) => {
                setGalleryPassword(event.target.value);
                setPasswordError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  verifyGalleryPassword();
                }
              }}
            />

            {passwordError && (
              <div className="password-error">
                {passwordError}
              </div>
            )}

            <div className="password-actions">

              <button
                className="password-cancel"
                onClick={closeGalleryPassword}
              >
                Cancel
              </button>

              <button
                className="password-submit"
                onClick={verifyGalleryPassword}
              >
                Continue
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =================================================
          FULL IMAGE LIGHTBOX
          HOME + ABOUT + FACILITIES + GALLERY
      ================================================= */}

      {selectedImage && (

        <div
          className="lightbox"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeImage();
            }
          }}
        >

          <div className="lightbox-content">

            <button
              className="lightbox-close"
              onClick={closeImage}
              aria-label="Close image"
            >
              ×
            </button>

            <img
              className="lightbox-image"
              src={selectedImage.src}
              alt={selectedImage.name}
            />

            <div className="lightbox-bottom">

              <div className="lightbox-title">
                {selectedImage.name}
              </div>

              {selectedImage.type === "uploaded" && (
                <button
                  className="lightbox-remove"
                  onClick={deleteSelectedUploadedPhoto}
                >
                  Remove Photo
                </button>
              )}

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default App;