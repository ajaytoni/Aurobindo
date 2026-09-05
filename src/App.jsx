import { useState } from "react";
import schoolLogo from "./image.png";

function App() {
  // =====================================================
  // STATES
  // =====================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [uploadedPhotos, setUploadedPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem(
        "aurobindokakatiyaUploadedPhotos"
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // =====================================================
  // SCHOOL DETAILS
  // =====================================================

  const schoolName = "Aurobindo Kakatiya Secondary School";
  const schoolPhone = "9959261196";
  const schoolEmail = "Aurobindo@117gmail.com";
  const whatsappNumber = "919959261196";

  // =====================================================
  // NAVIGATION
  // =====================================================

  const navItems = [
    ["Home", "home"],
    ["About", "about"],
    ["Programs", "programs"],
    ["Facilities", "facilities"],
    ["Admission", "admission"],
    ["Gallery", "gallery"],
    ["Contact", "contact"],
  ];

  // =====================================================
  // WHATSAPP
  // =====================================================

  const sendWhatsApp = () => {
    const whatsappMessage = `Hello Aurobindo Kakatiya Secondary School,

I would like to know more about admissions and the school.

Name: ${name || "Not provided"}
Phone: ${phone || "Not provided"}
Email: ${email || "Not provided"}

Message:
${message || "I would like to know more about the school."}`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    window.open(url, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendWhatsApp();
  };

  // =====================================================
  // IMAGE UPLOAD
  // =====================================================

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert("Please select image files only.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is larger than 5MB.`);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          name: file.name,
          src: reader.result,
        };

        setUploadedPhotos((previousPhotos) => {
          const updatedPhotos = [...previousPhotos, newPhoto];

          try {
            localStorage.setItem(
              "aurobindokakatiyaUploadedPhotos",
              JSON.stringify(updatedPhotos)
            );
          } catch {
            alert(
              "Unable to save this image. Browser storage may be full."
            );
          }

          return updatedPhotos;
        });
      };

      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  // =====================================================
  // DELETE PHOTO
  // =====================================================

  const deletePhoto = (id) => {
    setUploadedPhotos((previousPhotos) => {
      const updatedPhotos = previousPhotos.filter(
        (photo) => photo.id !== id
      );

      try {
        localStorage.setItem(
          "aurobindokakatiyaUploadedPhotos",
          JSON.stringify(updatedPhotos)
        );
      } catch {
        // Ignore storage error
      }

      return updatedPhotos;
    });

    if (selectedImage && selectedImage.id === id) {
      setSelectedImage(null);
    }
  };

  // =====================================================
  // STYLES
  // =====================================================

  const styles = `
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        sans-serif;
      background: #f8f3e7;
      color: #101a2b;
      line-height: 1.6;
    }

    button,
    input,
    textarea {
      font: inherit;
    }

    button {
      cursor: pointer;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    img {
      max-width: 100%;
      display: block;
    }

    .site-page {
      width: 100%;
      overflow-x: hidden;
      background: #f8f3e7;
    }

    /* ===================================================
       COMMON
    =================================================== */

    .container {
      width: min(1320px, calc(100% - 48px));
      margin: 0 auto;
    }

    .section {
      padding: 78px 0;
      background: #f8f3e7;
    }

    .section-light {
      background: #eee5d1;
    }

    .section-heading {
      width: min(650px, 100%);
      margin-bottom: 42px;
      text-align: left;
    }

    .eyebrow {
      display: inline-block;
      margin-bottom: 12px;
      color: #d6ae48;
      font-size: 13px;
      font-weight: 800;
      letter-spacing: 1.7px;
      text-transform: uppercase;
    }

    .home-welcome {
      position: relative;
      top: -4px;
      margin-bottom: 16px;
      color: #d6ae48;
      font-size: 15px;
      font-weight: 900;
      letter-spacing: 1.9px;
    }

    .section-heading h2 {
      color: #101a2b;
      font-size: clamp(30px, 3vw, 42px);
      line-height: 1.15;
      font-weight: 800;
      margin-bottom: 16px;
      text-align: left;
    }

    .section-heading p {
      color: #596474;
      font-size: 16px;
      line-height: 1.8;
      text-align: left;
    }

    .gold-line {
      width: 58px;
      height: 4px;
      margin-top: 18px;
      background: #d6ae48;
      border-radius: 4px;
    }

    /* ===================================================
       NAVBAR
    =================================================== */

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 78px;
      background: rgba(248, 243, 231, 0.97);
      border-bottom: 1px solid #d9cba9;
      box-shadow: 0 4px 20px rgba(16, 26, 43, 0.08);
    }

    .nav-inner {
      height: 78px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 25px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .brand-logo {
      width: 52px;
      height: 52px;
      object-fit: contain;
      flex-shrink: 0;
    }

    .brand-name {
      color: #101a2b;
      font-size: 17px;
      font-weight: 800;
      line-height: 1.2;
      max-width: 300px;
    }

    .desktop-nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 5px;
    }

    .desktop-nav a {
      padding: 10px 13px;
      color: #344052;
      font-size: 14px;
      font-weight: 700;
      border-radius: 7px;
      transition:
        color 0.2s ease,
        background 0.2s ease;
    }

    .desktop-nav a:hover {
      color: #101a2b;
      background: #eee5d1;
    }

    .nav-admission {
      color: #ffffff !important;
      background: #101a2b !important;
      padding: 11px 17px !important;
    }

    .nav-admission:hover {
      background: #1d2a42 !important;
    }

    .mobile-menu-button {
      display: none;
      width: 44px;
      height: 44px;
      border: 1px solid #d9cba9;
      background: #f8f3e7;
      color: #101a2b;
      border-radius: 8px;
      font-size: 24px;
    }

    /* ===================================================
       MOBILE MENU
    =================================================== */

    .mobile-menu-overlay {
      position: fixed;
      inset: 0;
      z-index: 1100;
      background: rgba(16, 26, 43, 0.55);
    }

    .mobile-menu {
      position: absolute;
      top: 0;
      right: 0;
      width: min(330px, 86vw);
      height: 100%;
      background: #f8f3e7;
      padding: 24px;
      box-shadow: -10px 0 35px rgba(0, 0, 0, 0.16);
      overflow-y: auto;
    }

    .mobile-menu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      padding-bottom: 22px;
      border-bottom: 1px solid #d9cba9;
    }

    .mobile-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .mobile-brand img {
      width: 46px;
      height: 46px;
      object-fit: contain;
    }

    .mobile-brand span {
      color: #101a2b;
      font-size: 15px;
      font-weight: 800;
      line-height: 1.25;
    }

    .mobile-close {
      width: 40px;
      height: 40px;
      border: 1px solid #d9cba9;
      border-radius: 7px;
      background: #eee5d1;
      color: #101a2b;
      font-size: 22px;
    }

    .mobile-links {
      display: flex;
      flex-direction: column;
      margin-top: 22px;
      gap: 5px;
    }

    .mobile-links a {
      display: block;
      padding: 14px 13px;
      color: #344052;
      font-size: 16px;
      font-weight: 700;
      border-radius: 7px;
    }

    .mobile-links a:hover {
      background: #eee5d1;
      color: #101a2b;
    }

    /* ===================================================
       HOME
    =================================================== */

    .home-section {
      min-height: 100vh;
      padding: 145px 0 75px;
      background:
        linear-gradient(
          90deg,
          #f8f3e7 0%,
          #f5eddc 48%,
          #eee5d1 100%
        );
    }

    .home-grid {
      min-height: calc(100vh - 220px);
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(380px, 0.95fr);
      align-items: center;
      gap: 70px;
    }

    .home-content {
      width: min(650px, 100%);
      text-align: left;
    }

    .home-content h1 {
      max-width: 650px;
      margin-bottom: 22px;
      color: #101a2b;
      font-size: clamp(32px, 3.6vw, 48px);
      line-height: 1.12;
      font-weight: 850;
      letter-spacing: -0.8px;
      text-align: left;
    }

    .home-content p {
      max-width: 650px;
      margin-bottom: 14px;
      color: #596474;
      font-size: 17px;
      line-height: 1.8;
      text-align: left;
    }

    .home-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 13px;
      margin-top: 28px;
      justify-content: flex-start;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 48px;
      padding: 12px 22px;
      border-radius: 7px;
      font-size: 14px;
      font-weight: 800;
      border: 1px solid transparent;
      transition:
        transform 0.2s ease,
        background 0.2s ease,
        border 0.2s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
    }

    .btn-primary {
      background: #101a2b;
      color: #ffffff;
    }

    .btn-primary:hover {
      background: #1d2a42;
    }

    .btn-secondary {
      background: #f8f3e7;
      color: #101a2b;
      border-color: #d6ae48;
    }

    .btn-secondary:hover {
      background: #eee5d1;
    }

    .home-image-wrap {
      width: 100%;
      min-height: 470px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eee5d1;
      border: 1px solid #d9cba9;
      border-radius: 14px;
      overflow: hidden;
    }

    .home-image {
      width: 100%;
      height: 470px;
      object-fit: contain;
      background: #f8f3e7;
    }

    /* ===================================================
       ABOUT
    =================================================== */

    .about-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(400px, 0.9fr);
      gap: 70px;
      align-items: center;
    }

    .about-content {
      width: min(650px, 100%);
      text-align: left;
    }

    .about-content h3 {
      margin-bottom: 15px;
      color: #101a2b;
      font-size: 24px;
      line-height: 1.25;
      font-weight: 800;
      text-align: left;
    }

    .about-content p {
      margin-bottom: 15px;
      color: #596474;
      font-size: 16px;
      line-height: 1.8;
      text-align: left;
    }

    .about-points {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 25px;
    }

    .about-point {
      padding: 18px;
      background: #f8f3e7;
      border: 1px solid #d9cba9;
      border-radius: 8px;
    }

    .about-point strong {
      display: block;
      margin-bottom: 6px;
      color: #101a2b;
      font-size: 15px;
      text-align: left;
    }

    .about-point span {
      display: block;
      color: #596474;
      font-size: 13px;
      line-height: 1.6;
      text-align: left;
    }

    .about-image-wrap {
      width: 100%;
      min-height: 460px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      background: #f8f3e7;
      border: 1px solid #d9cba9;
      border-radius: 14px;
    }

    .about-image {
      width: 100%;
      height: 460px;
      object-fit: contain;
    }

    /* ===================================================
       PROGRAMS
    =================================================== */

    .programs-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .program-card {
      padding: 26px;
      background: #f8f3e7;
      border: 1px solid #d9cba9;
      border-radius: 9px;
      min-height: 180px;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border 0.2s ease;
    }

    .program-card:hover {
      transform: translateY(-4px);
      border-color: #d6ae48;
      box-shadow: 0 12px 28px rgba(16, 26, 43, 0.08);
    }

    .card-number {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
      border-radius: 50%;
      background: #101a2b;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
    }

    .program-card h3 {
      margin-bottom: 9px;
      color: #101a2b;
      font-size: 18px;
      line-height: 1.3;
      text-align: left;
    }

    .program-card p {
      color: #596474;
      font-size: 14px;
      line-height: 1.7;
      text-align: left;
    }

    /* ===================================================
       FACILITIES
    =================================================== */

    .facilities-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 18px;
    }

    .facility-card {
      padding: 28px;
      background: #f8f3e7;
      border: 1px solid #d9cba9;
      border-radius: 9px;
      min-height: 190px;
    }

    .facility-icon {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
      background: #101a2b;
      color: #d6ae48;
      border-radius: 8px;
      font-size: 20px;
      font-weight: 800;
    }

    .facility-card h3 {
      margin-bottom: 9px;
      color: #101a2b;
      font-size: 18px;
      line-height: 1.3;
      text-align: left;
    }

    .facility-card p {
      color: #596474;
      font-size: 14px;
      line-height: 1.7;
      text-align: left;
    }

    /* ===================================================
       ADMISSION
    =================================================== */

    .admission-steps {
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 15px;
    }

    .admission-step {
      padding: 25px 20px;
      background: #f8f3e7;
      border: 1px solid #d9cba9;
      border-radius: 9px;
      min-height: 205px;
    }

    .step-number {
      color: #d6ae48;
      font-size: 28px;
      font-weight: 850;
      line-height: 1;
      margin-bottom: 20px;
    }

    .admission-step h3 {
      margin-bottom: 9px;
      color: #101a2b;
      font-size: 17px;
      line-height: 1.3;
      text-align: left;
    }

    .admission-step p {
      color: #596474;
      font-size: 13px;
      line-height: 1.7;
      text-align: left;
    }

    .admission-note {
      width: min(650px, 100%);
      margin-top: 28px;
      padding: 19px 21px;
      background: #f3e5bd;
      border-left: 4px solid #d6ae48;
      color: #596474;
      font-size: 14px;
      line-height: 1.7;
      text-align: left;
    }

    /* ===================================================
       GALLERY
    =================================================== */

    .gallery-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 30px;
      margin-bottom: 30px;
    }

    .gallery-top .section-heading {
      margin-bottom: 0;
    }

    .upload-box {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .upload-label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 46px;
      padding: 11px 18px;
      background: #101a2b;
      color: #ffffff;
      border-radius: 7px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
    }

    .upload-label:hover {
      background: #1d2a42;
    }

    .upload-input {
      display: none;
    }

    .gallery-info {
      margin-top: 8px;
      color: #596474;
      font-size: 12px;
      text-align: left;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 14px;
    }

    .gallery-card {
      position: relative;
      background: #f8f3e7;
      border: 1px solid #d9cba9;
      border-radius: 8px;
      overflow: hidden;
    }

    .gallery-image-button {
      display: block;
      width: 100%;
      padding: 0;
      border: 0;
      background: #f8f3e7;
    }

    .gallery-image {
      width: 100%;
      height: 245px;
      object-fit: contain;
      background: #f8f3e7;
    }

    .gallery-delete {
      position: absolute;
      top: 9px;
      right: 9px;
      width: 34px;
      height: 34px;
      border: 0;
      border-radius: 50%;
      background: rgba(16, 26, 43, 0.88);
      color: #ffffff;
      font-size: 15px;
      z-index: 3;
    }

    .gallery-delete:hover {
      background: #101a2b;
    }

    .empty-gallery {
      width: 100%;
      padding: 55px 25px;
      background: #f8f3e7;
      border: 1px dashed #c8b889;
      border-radius: 9px;
      text-align: left;
    }

    .empty-gallery h3 {
      margin-bottom: 8px;
      color: #101a2b;
      font-size: 20px;
      text-align: left;
    }

    .empty-gallery p {
      max-width: 650px;
      color: #596474;
      font-size: 14px;
      line-height: 1.7;
      text-align: left;
    }

    /* ===================================================
       LIGHTBOX
    =================================================== */

    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 30px;
      background: rgba(16, 26, 43, 0.95);
    }

    .lightbox-image {
      max-width: min(1100px, 94vw);
      max-height: 88vh;
      object-fit: contain;
    }

    .lightbox-close {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 46px;
      height: 46px;
      border: 0;
      border-radius: 50%;
      background: #f8f3e7;
      color: #101a2b;
      font-size: 25px;
      z-index: 2001;
    }

    /* ===================================================
       CONTACT
    =================================================== */

    .contact-grid {
      display: grid;
      grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
      gap: 55px;
      align-items: start;
    }

    .contact-info {
      width: min(600px, 100%);
      text-align: left;
    }

    .contact-info h3 {
      margin-bottom: 15px;
      color: #101a2b;
      font-size: 26px;
      line-height: 1.25;
      text-align: left;
    }

    .contact-info > p {
      margin-bottom: 27px;
      color: #596474;
      font-size: 15px;
      line-height: 1.8;
      text-align: left;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 19px;
    }

    .contact-icon {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #101a2b;
      color: #d6ae48;
      border-radius: 7px;
      font-size: 17px;
      font-weight: 800;
    }

    .contact-item strong {
      display: block;
      margin-bottom: 2px;
      color: #101a2b;
      font-size: 14px;
      text-align: left;
    }

    .contact-item span,
    .contact-item a {
      color: #596474;
      font-size: 14px;
      line-height: 1.6;
      word-break: break-word;
      text-align: left;
    }

    .map-box {
      width: 100%;
      height: 300px;
      margin-top: 27px;
      border-radius: 9px;
      overflow: hidden;
      border: 1px solid #d9cba9;
    }

    .map-box iframe {
      width: 100%;
      height: 100%;
      border: 0;
    }

    .contact-form-box {
      width: 100%;
      padding: 30px;
      background: #f8f3e7;
      border: 1px solid #d9cba9;
      border-radius: 10px;
      box-shadow: 0 12px 30px rgba(16, 26, 43, 0.08);
    }

    .contact-form-box h3 {
      margin-bottom: 7px;
      color: #101a2b;
      font-size: 24px;
      line-height: 1.3;
      text-align: left;
    }

    .contact-form-box > p {
      margin-bottom: 24px;
      color: #596474;
      font-size: 14px;
      line-height: 1.7;
      text-align: left;
    }

    .form-group {
      margin-bottom: 17px;
    }

    .form-group label {
      display: block;
      margin-bottom: 7px;
      color: #101a2b;
      font-size: 13px;
      font-weight: 750;
      text-align: left;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      border: 1px solid #d1c3a4;
      border-radius: 7px;
      background: #fdf9ef;
      color: #101a2b;
      outline: none;
      transition: border 0.2s ease;
    }

    .form-group input {
      height: 47px;
      padding: 0 13px;
    }

    .form-group textarea {
      min-height: 125px;
      padding: 12px 13px;
      resize: vertical;
    }

    .form-group input:focus,
    .form-group textarea:focus {
      border-color: #d6ae48;
    }

    .form-submit {
      width: 100%;
      margin-top: 5px;
    }

    /* ===================================================
       FOOTER
    =================================================== */

    .footer {
      padding: 58px 0 25px;
      background: #101a2b;
      color: #ffffff;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr 1fr;
      gap: 55px;
      padding-bottom: 40px;
    }

    .footer-brand {
      max-width: 440px;
      text-align: left;
    }

    .footer-logo {
      width: 65px;
      height: 65px;
      object-fit: contain;
      margin-bottom: 17px;
      background: #f8f3e7;
      border-radius: 7px;
      padding: 4px;
    }

    .footer-brand h3 {
      margin-bottom: 11px;
      font-size: 21px;
      line-height: 1.3;
      text-align: left;
    }

    .footer-brand p {
      color: #c5ccd6;
      font-size: 14px;
      line-height: 1.8;
      text-align: left;
    }

    .footer-column h4 {
      margin-bottom: 17px;
      color: #d6ae48;
      font-size: 14px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      text-align: left;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .footer-links a {
      color: #d3d9e1;
      font-size: 14px;
      text-align: left;
    }

    .footer-links a:hover {
      color: #ffffff;
    }

    .footer-contact {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .footer-contact a,
    .footer-contact span {
      color: #d3d9e1;
      font-size: 14px;
      line-height: 1.6;
      word-break: break-word;
      text-align: left;
    }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      padding-top: 23px;
      border-top: 1px solid rgba(255, 255, 255, 0.13);
    }

    .footer-bottom p {
      color: #aeb7c4;
      font-size: 12px;
      line-height: 1.6;
      text-align: left;
    }

    .developer-link {
      color: #d6ae48 !important;
      font-weight: 750;
    }

    /* ===================================================
       TABLET
    =================================================== */

    @media (max-width: 1100px) {
      .desktop-nav {
        gap: 0;
      }

      .desktop-nav a {
        padding-left: 9px;
        padding-right: 9px;
        font-size: 13px;
      }

      .home-grid {
        grid-template-columns: minmax(0, 1fr) minmax(330px, 0.85fr);
        gap: 45px;
      }

      .about-grid {
        grid-template-columns: minmax(0, 1fr) minmax(330px, 0.85fr);
        gap: 45px;
      }

      .programs-grid,
      .facilities-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .admission-steps {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .gallery-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }

    /* ===================================================
       MOBILE
    =================================================== */

    @media (max-width: 850px) {
      .container {
        width: min(100% - 30px, 700px);
      }

      .section {
        padding: 55px 0;
      }

      .navbar,
      .nav-inner {
        height: 70px;
      }

      .brand-logo {
        width: 46px;
        height: 46px;
      }

      .brand-name {
        font-size: 14px;
        max-width: 220px;
      }

      .desktop-nav {
        display: none;
      }

      .mobile-menu-button {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .home-section {
        min-height: auto;
        padding: 112px 0 45px;
      }

      .home-grid {
        min-height: auto;
        grid-template-columns: 1fr;
        gap: 28px;
      }

      .home-content {
        width: 100%;
      }

      .home-content h1 {
        font-size: clamp(32px, 8vw, 42px);
        line-height: 1.12;
      }

      .home-content p {
        font-size: 15px;
        line-height: 1.72;
      }

      .home-image-wrap {
        min-height: 290px;
      }

      .home-image {
        height: 290px;
      }

      .about-grid {
        grid-template-columns: 1fr;
        gap: 28px;
      }

      .about-image-wrap {
        min-height: 290px;
        order: 2;
      }

      .about-content {
        order: 1;
      }

      .about-image {
        height: 290px;
      }

      .about-points {
        grid-template-columns: 1fr;
      }

      .programs-grid,
      .facilities-grid {
        grid-template-columns: 1fr;
        gap: 14px;
      }

      .program-card,
      .facility-card {
        min-height: auto;
      }

      .admission-steps {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
      }

      .admission-step {
        min-height: auto;
      }

      .gallery-top {
        flex-direction: column;
        gap: 20px;
      }

      .upload-box {
        width: 100%;
      }

      .upload-label {
        width: 100%;
      }

      .gallery-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .gallery-image {
        height: 190px;
      }

      .contact-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .contact-form-box {
        padding: 23px;
      }

      .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 35px;
      }

      .footer-brand {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 560px) {
      .container {
        width: calc(100% - 24px);
      }

      .section {
        padding: 46px 0;
      }

      .section-heading {
        margin-bottom: 28px;
      }

      .section-heading h2 {
        font-size: 30px;
      }

      .section-heading p {
        font-size: 14px;
        line-height: 1.7;
      }

      .brand-name {
        max-width: 185px;
        font-size: 13px;
      }

      .home-section {
        padding-top: 102px;
      }

      .home-welcome {
        font-size: 13px;
        letter-spacing: 1.4px;
        margin-bottom: 14px;
      }

      .home-content h1 {
        font-size: 32px;
      }

      .home-buttons {
        flex-direction: column;
        width: 100%;
      }

      .home-buttons .btn {
        width: 100%;
      }

      .home-image-wrap {
        min-height: 250px;
      }

      .home-image {
        height: 250px;
      }

      .about-image-wrap {
        min-height: 250px;
      }

      .about-image {
        height: 250px;
      }

      .admission-steps {
        grid-template-columns: 1fr;
      }

      .gallery-grid {
        grid-template-columns: 1fr;
      }

      .gallery-image {
        height: 240px;
      }

      .empty-gallery {
        padding: 40px 20px;
      }

      .map-box {
        height: 250px;
      }

      .footer {
        padding-top: 45px;
      }

      .footer-grid {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .footer-brand {
        grid-column: auto;
      }

      .footer-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `;

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="site-page">
      <style>{styles}</style>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <header className="navbar">
        <div className="container nav-inner">
          <a
            href="#home"
            className="brand"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={schoolLogo}
              alt={schoolName}
              className="brand-logo"
            />

            <span className="brand-name">{schoolName}</span>
          </a>

          <nav className="desktop-nav">
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={id === "admission" ? "nav-admission" : ""}
              >
                {label}
              </a>
            ))}
          </nav>

          <button
            className="mobile-menu-button"
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* =================================================
          MOBILE MENU
      ================================================= */}

      {mobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <div className="mobile-brand">
                <img src={schoolLogo} alt={schoolName} />
                <span>{schoolName}</span>
              </div>

              <button
                className="mobile-close"
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <nav className="mobile-links">
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* =================================================
          HOME
      ================================================= */}

      <section id="home" className="home-section">
        <div className="container home-grid">
          <div className="home-content">
            <span className="eyebrow home-welcome">
              Welcome to Aurobindo Kakatiya Secondary School
            </span>

            <h1>
              Building Strong Foundations for a Bright Future
            </h1>

            <p>
              Aurobindo Kakatiya Secondary School provides a
              supportive and disciplined learning environment
              where students are encouraged to learn,
              explore, communicate and grow with confidence.
            </p>

            <p>
              From Nursery to Class 10, our approach combines
              strong academics with character development,
              creativity, practical learning and essential
              life skills.
            </p>

            <div className="home-buttons">
              <a href="#admission" className="btn btn-primary">
                Admission Enquiry
              </a>

              <a href="#contact" className="btn btn-secondary">
                Contact School
              </a>
            </div>
          </div>

          <div className="home-image-wrap">
            <img
              src={schoolLogo}
              alt="Aurobindo Kakatiya Secondary School"
              className="home-image"
            />
          </div>
        </div>
      </section>

      {/* =================================================
          ABOUT
      ================================================= */}

      <section id="about" className="section section-light">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">About Our School</span>

            <h2>
              Learning Today for a Stronger Tomorrow
            </h2>

            <p>
              We focus on creating a positive educational
              foundation for every child from Nursery to
              Class 10.
            </p>

            <div className="gold-line"></div>
          </div>

          <div className="about-grid">
            <div className="about-content">
              <h3>Education with Purpose and Values</h3>

              <p>
                Aurobindo Kakatiya Secondary School believes
                that education is more than academic
                achievement. It is about helping children
                become confident, responsible and capable
                individuals.
              </p>

              <p>
                Our learning environment encourages curiosity,
                communication, creativity, discipline and
                respect. Students are guided to develop strong
                fundamentals while discovering their own
                strengths and interests.
              </p>

              <p>
                With age-appropriate learning from Nursery to
                Class 10, we aim to support students through
                every important stage of their school journey.
              </p>

              <div className="about-points">
                <div className="about-point">
                  <strong>Strong Academic Foundation</strong>
                  <span>
                    Clear concepts and structured learning
                    support academic growth.
                  </span>
                </div>

                <div className="about-point">
                  <strong>Individual Attention</strong>
                  <span>
                    Students receive guidance according to
                    their learning needs.
                  </span>
                </div>

                <div className="about-point">
                  <strong>Character & Discipline</strong>
                  <span>
                    Good habits, responsibility and respect are
                    encouraged every day.
                  </span>
                </div>

                <div className="about-point">
                  <strong>Holistic Development</strong>
                  <span>
                    Academic, creative, social and personal
                    development are given importance.
                  </span>
                </div>
              </div>
            </div>

            <div className="about-image-wrap">
              <img
                src={schoolLogo}
                alt="School learning environment"
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          PROGRAMS
      ================================================= */}

      <section id="programs" className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Academic Programs</span>

            <h2>
              Learning Programs from Nursery to Class 10
            </h2>

            <p>
              Our programs are designed to build strong
              fundamentals, confidence, communication and
              practical learning habits at every stage.
            </p>

            <div className="gold-line"></div>
          </div>

          <div className="programs-grid">
            <div className="program-card">
              <div className="card-number">01</div>
              <h3>Nursery</h3>
              <p>
                A gentle and engaging introduction to school
                life through play, communication and basic
                concepts.
              </p>
            </div>

            <div className="program-card">
              <div className="card-number">02</div>
              <h3>LKG</h3>
              <p>
                Early learning activities that develop
                language, numbers, creativity and social
                confidence.
              </p>
            </div>

            <div className="program-card">
              <div className="card-number">03</div>
              <h3>UKG</h3>
              <p>
                School-readiness learning with stronger
                literacy, numeracy and communication skills.
              </p>
            </div>

            <div className="program-card">
              <div className="card-number">04</div>
              <h3>Classes 1st to 5th</h3>
              <p>
                Strong foundational academics supported by
                activity-based and concept-focused learning.
              </p>
            </div>

            <div className="program-card">
              <div className="card-number">05</div>
              <h3>Classes 6th to 8th</h3>
              <p>
                Deeper subject understanding, analytical
                thinking and independent learning habits.
              </p>
            </div>

            <div className="program-card">
              <div className="card-number">06</div>
              <h3>Classes 9th & 10th</h3>
              <p>
                Focused academic preparation with revision,
                discipline and examination-oriented guidance.
              </p>
            </div>

            <div className="program-card">
              <div className="card-number">07</div>
              <h3>Handwriting Improvement</h3>
              <p>
                Practice that helps students develop neat,
                clear and confident handwriting.
              </p>
            </div>

            <div className="program-card">
              <div className="card-number">08</div>
              <h3>Abacus & Mental Math</h3>
              <p>
                Activities designed to improve number sense,
                concentration and mental calculation.
              </p>
            </div>

            <div className="program-card">
              <div className="card-number">09</div>
              <h3>Holistic Development</h3>
              <p>
                Opportunities that support creativity,
                communication, confidence and personal growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          FACILITIES
      ================================================= */}

      <section id="facilities" className="section section-light">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">School Facilities</span>

            <h2>
              A Supportive Environment for Better Learning
            </h2>

            <p>
              We aim to provide students with a safe,
              structured and encouraging environment for
              learning and development.
            </p>

            <div className="gold-line"></div>
          </div>

          <div className="facilities-grid">
            <div className="facility-card">
              <div className="facility-icon">01</div>
              <h3>Modern Classrooms</h3>
              <p>
                Comfortable learning spaces designed to keep
                students focused and engaged.
              </p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">02</div>
              <h3>Experienced Teachers</h3>
              <p>
                Dedicated educators guide students with care,
                discipline and academic focus.
              </p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">03</div>
              <h3>Safe Learning Environment</h3>
              <p>
                A disciplined and supportive atmosphere where
                students can learn with confidence.
              </p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">04</div>
              <h3>Activity-Based Learning</h3>
              <p>
                Activities and practical experiences help
                students understand concepts effectively.
              </p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">05</div>
              <h3>Learning Resources</h3>
              <p>
                Useful academic resources encourage regular
                practice, revision and independent learning.
              </p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">06</div>
              <h3>Personality Development</h3>
              <p>
                Students are encouraged to improve confidence,
                communication, responsibility and teamwork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          ADMISSION
      ================================================= */}

      <section id="admission" className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Admissions</span>

            <h2>
              A Simple and Clear Admission Process
            </h2>

            <p>
              We make the admission process straightforward
              for parents and students.
            </p>

            <div className="gold-line"></div>
          </div>

          <div className="admission-steps">
            <div className="admission-step">
              <div className="step-number">01</div>
              <h3>Enquiry</h3>
              <p>
                Contact the school to understand admissions,
                classes and available information.
              </p>
            </div>

            <div className="admission-step">
              <div className="step-number">02</div>
              <h3>School Visit</h3>
              <p>
                Visit the school and understand the learning
                environment and facilities.
              </p>
            </div>

            <div className="admission-step">
              <div className="step-number">03</div>
              <h3>Discussion</h3>
              <p>
                Discuss the student's educational needs and
                admission requirements.
              </p>
            </div>

            <div className="admission-step">
              <div className="step-number">04</div>
              <h3>Documentation</h3>
              <p>
                Complete the required admission forms and
                submit the necessary documents.
              </p>
            </div>

            <div className="admission-step">
              <div className="step-number">05</div>
              <h3>Confirmation</h3>
              <p>
                Complete the final admission formalities and
                begin the student's school journey.
              </p>
            </div>
          </div>

          <div className="admission-note">
            For admission enquiries, please contact the school
            directly at <strong>{schoolPhone}</strong> or send
            us a message through WhatsApp.
          </div>

          <div className="home-buttons">
            <a href="#contact" className="btn btn-primary">
              Contact for Admission
            </a>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                const admissionMessage =
                  "Hello Aurobindo Kakatiya Secondary School, I would like to know more about admissions.";

                window.open(
                  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    admissionMessage
                  )}`,
                  "_blank"
                );
              }}
            >
              WhatsApp Enquiry
            </button>
          </div>
        </div>
      </section>

      {/* =================================================
          GALLERY
      ================================================= */}

      <section id="gallery" className="section section-light">
        <div className="container">
          <div className="gallery-top">
            <div className="section-heading">
              <span className="eyebrow">School Gallery</span>

              <h2>
                Moments from Aurobindo Kakatiya
              </h2>

              <p>
                Upload school photographs here to create your
                own gallery. Click any uploaded photograph to
                view it larger.
              </p>

              <div className="gold-line"></div>

              <p className="gallery-info">
                JPG, PNG, WEBP and other image formats up to
                5MB each.
              </p>
            </div>

            <div className="upload-box">
              <label className="upload-label">
                + Upload Photos
                <input
                  className="upload-input"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          {uploadedPhotos.length === 0 ? (
            <div className="empty-gallery">
              <h3>No gallery photos added yet</h3>
              <p>
                Use the “Upload Photos” button above to add
                school images. The uploaded images are stored
                in this browser for this website.
              </p>
            </div>
          ) : (
            <div className="gallery-grid">
              {uploadedPhotos.map((photo) => (
                <div className="gallery-card" key={photo.id}>
                  <button
                    type="button"
                    className="gallery-image-button"
                    onClick={() => setSelectedImage(photo)}
                    aria-label={`View ${photo.name}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.name}
                      className="gallery-image"
                    />
                  </button>

                  <button
                    type="button"
                    className="gallery-delete"
                    onClick={() => deletePhoto(photo.id)}
                    aria-label={`Delete ${photo.name}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          LIGHTBOX
      ================================================= */}

      {selectedImage && (
        <div
          className="lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.name}
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* =================================================
          CONTACT
      ================================================= */}

      <section id="contact" className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Contact Us</span>

            <h2>
              We Would Be Happy to Hear From You
            </h2>

            <p>
              Contact the school for admissions, enquiries or
              any additional information.
            </p>

            <div className="gold-line"></div>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h3>{schoolName}</h3>

              <p>
                Get in touch with our school team for
                information about admissions, academics,
                programs and the school environment.
              </p>

              <div className="contact-item">
                <div className="contact-icon">☎</div>

                <div>
                  <strong>Phone</strong>

                  <a href={`tel:${schoolPhone}`}>
                    {schoolPhone}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">✉</div>

                <div>
                  <strong>Email</strong>

                  <a href={`mailto:${schoolEmail}`}>
                    {schoolEmail}
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">W</div>

                <div>
                  <strong>WhatsApp</strong>

                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              <div className="map-box">
                <iframe
                  title="Aurobindo Kakatiya Secondary School Map"
                  src="https://www.google.com/maps?q=Aurobindo+Kakatiya+Secondary+School&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <form
              className="contact-form-box"
              onSubmit={handleSubmit}
            >
              <h3>Send an Enquiry</h3>

              <p>
                Fill in your details and the enquiry will open
                directly in WhatsApp.
              </p>

              <div className="form-group">
                <label htmlFor="name">Name</label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>

                <textarea
                  id="message"
                  placeholder="Write your enquiry"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary form-submit"
              >
                Send on WhatsApp
              </button>
            </form>
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
                src={schoolLogo}
                alt={schoolName}
                className="footer-logo"
              />

              <h3>{schoolName}</h3>

              <p>
                Building strong academic foundations,
                confidence, discipline and values for students
                from Nursery to Class 10.
              </p>
            </div>

            <div className="footer-column">
              <h4>Quick Links</h4>

              <div className="footer-links">
                {navItems.map(([label, id]) => (
                  <a key={id} href={`#${id}`}>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>

              <div className="footer-contact">
                <a href={`tel:${schoolPhone}`}>
                  {schoolPhone}
                </a>

                <a href={`mailto:${schoolEmail}`}>
                  {schoolEmail}
                </a>

                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Enquiry
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} {schoolName}. All
              Rights Reserved.
            </p>

            <p>
              Website developed by{" "}
              <a
                href="https://www.astroideasoftway.com/"
                target="_blank"
                rel="noreferrer"
                className="developer-link"
              >
                AstroIdea Softway LLP
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;