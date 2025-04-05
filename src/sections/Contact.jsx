import { useRef, useState } from 'react';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

const Contact = () => {
  const formRef = useRef();
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const subject = `Message from ${form.name}`;
    const body = `Name: ${form.name}%0D%0AEmail: ${form.email}%0D%0A%0D%0AMessage: ${form.message}`;
    const mailtoLink = `mailto:jaiswalayush015@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    
    setLoading(false);
    showAlert({
      show: true,
      text: 'Opening your email client...',
      type: 'success',
    });

    setTimeout(() => {
      hideAlert(false);
      setForm({
        name: '',
        email: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        

        <div className="contact-container max-w-3xl w-full mx-auto p-8 bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Whether you're looking to build a new website, improve your existing platform, or bring a unique project to
            life, I'm here to help.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}

              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
