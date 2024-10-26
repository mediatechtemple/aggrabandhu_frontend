import { FaYoutube, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';

const SocialMediaLinks = () => {
  return (
    <div className="flex flex-col items-center p-8">
      {/* Heading */}
      {/* <h2 className="text-2xl font-bold mb-4 font-serif text-blue-500">Follow us on social media for the latest updates, news, and more!</h2> */}
      {/* <p className="text-center mb-6 text-3xl  text-blue-500">
        Follow us on social media for the latest updates, news, and more!
      </p> */}
      
      <div className="flex items-center justify-between space-x-8">
        {/* YouTube Box */}
        <Link href="https://www.youtube.com/@AggrabandhuSewaSansthan" className='border  m-1' target="_blank" rel="noopener noreferrer">
          <div className="w-32 h-32 bg-red-600 text-white flex items-center justify-center rounded-lg shadow-lg hover:scale-105 transition transform duration-200">
            <FaYoutube size={48} />
          </div>
        </Link>

        {/* Instagram Box */}
        <Link href=" https://www.instagram.com/agrabandhusevarthsansthan" className='border rounded-xl  m-1'   target="_blank" rel="noopener noreferrer">
          <div className="w-32 h-32 bg-[#fc03e3]  border border-spacing-10 border-red-500 text-[#fc03e3]  flex items-center justify-center rounded-lg shadow-lg hover:scale-105 transition transform duration-200">
            <img src='insta.ico'  />
          </div>
        </Link>

        {/* Facebook Box */}
        <Link href=" https://www.facebook.com/aggrabandhusevarthsansthan/" className='border  m-1' target="_blank" rel="noopener noreferrer">
          <div className="w-32 h-32 bg-blue-700 text-white flex items-center justify-center rounded-lg shadow-lg hover:scale-105 transition transform duration-200">
            <FaFacebook size={48} />
          </div>
        </Link>

        {/* WhatsApp Box */}
        <Link href="https://whatsapp.com/channel/0029VajOtfp59PwSxSNdHT1W" className='border  m-1' target="_blank" rel="noopener noreferrer">
          <div className="w-32 h-32 bg-green-500 text-white flex items-center justify-center rounded-lg shadow-lg hover:scale-105 transition transform duration-200">
            <FaWhatsapp size={48} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
