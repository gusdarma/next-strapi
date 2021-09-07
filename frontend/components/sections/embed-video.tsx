interface typesEmbedLink {
    data : {
        Urlvideo : string
    }
}

const Embed: React.FC<typesEmbedLink> = (data) => {
    return (
        <>
            <div className="container py-12">
                <div className="video-responsive">
                    <iframe
                    width="853"
                    height="480"
                    src={data.data.Urlvideo}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    className="mx-auto"
                    />
                </div>
            </div>
        </>
    );
};

export default Embed;
