'use client';
import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


const ShareModal = ({handleShareModal,showShareModal}:any) => {

    const handleshowShareModal=()=>{
        handleShareModal((prev:boolean) =>!prev)
    }

    const handleShare = (platform:string) => {
        const url = window.location.href;
        let shareUrl = '';
    
        switch (platform) {
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
            break;
          case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
            break;
          case 'pinterest':
            shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`;
            break;
          default:
            return;
        }
    
        window.open(shareUrl, '_blank', 'noopener,noreferrer');
      };
    
    return (
        <>
       {showShareModal && < div className='fixed top-0 left-0 flex justify-center items-center p-5  bg-opacity-50 bg-black h-[100vh] w-[100vw] z-50' >
       <div className='shareModal p-6 bg-white sm:w-[500px] max-h-[500px] w-[400px] transition-all duration-300 ease-in-out m-auto rounded-lg'>
            <div className='flex justify-between mb-5'>
                <h1 className=' text-2xl font-extrabold' style={{color:'#29a637'}}>Share Product</h1>
                <span onClick={handleshowShareModal}><FontAwesomeIcon icon={faXmark} size='2x' style={{color:'#29a637'}} /></span>
               
            </div>
            <div className='close'>

                <div onClick={() => handleShare('facebook')} className='flex gap-2 cursor-pointer bg-blue-600 px-2 py-3 text-white rounded-full justify-center items-center'>
                    <div className='rounded-full w-5 p-1 text-xs bg-white'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z" /></svg>
                    </div>
                    Share on Facebook
                </div>
                <div onClick={() => handleShare('twitter')} className='flex gap-2 cursor-pointer bg-sky-600 px-2 py-3 text-white rounded-full justify-center items-center'>
                    <div className='rounded-full w-5 p-1 bg-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" /></svg>
                   </div>
                    Share on Twitter
                </div>
                <div onClick={() => handleShare('whatsapp')} className='flex gap-2 cursor-pointer bg-blue-800 px-2 py-3 text-white rounded-full justify-center items-center'>
                    <div className='rounded-full w-5 p-1 bg-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg>
                   </div>
                    Share on Whatsapp
                </div>
                <div onClick={() => handleShare('pinterest')} className='flex gap-2 cursor-pointer bg-red-600 px-2 py-3 text-white rounded-full justify-center items-center'>
                    <div className='rounded-full w-5 p-1 bg-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z" /></svg>
                   </div>
                    Share on pinterest
                </div>
                <div onClick={() => handleShare('linkedin')} className='flex gap-2 cursor-pointer bg-sky-900 px-2 py-3 text-white rounded-full justify-center items-center'>
                <div className='rounded-full w-5 p-1 bg-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg>
                   </div>
                    Share on Linkedin
                </div>
            </div>

        </div>
        </div>}
        </>
    )
}

export default ShareModal