import React from 'react';

function index() {
    return (
        <>
            <div className="w-full bg-gray-700 min-h-screen px-2 pb-4">
                <div className="w-full flex flex-col">
                    <div className="bg-gray-800 p-2 font-bold text-white text-2xl text-center my-1">
                        YouTube Videos
                    </div>
                    <div className="flex flex-row space-x-2 overflow-auto scrollbar-hide">
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/rGEOEM5ATdk"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/8klqIM9UvAc"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/CQjGqtH-2YI"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                </div>
                <div className="w-full flex flex-col">
                    <div className="bg-gray-800 p-2 font-bold text-white text-2xl text-center my-1">
                        Google Map Embeding
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d118103.45687625333!2d91.81986775!3d22.32593435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1673414719236!5m2!1sen!2sbd"
                            width="600"
                            height="450"
                            allowfullscreen={true}
                            loading="lazy"
                            className="w-full"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </>
    );
}

export default index;
