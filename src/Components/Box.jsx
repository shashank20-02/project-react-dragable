export default function Box({ data, boxRef }) {
    if (data <= 0) return;
    return (
        <article className="box" ref={boxRef}>
            <div className="titlebox">
                <h1 className="heading">
                    Title {data === 1 ? " (Child)" : `After Click ${data - 1}`}
                </h1>
            </div>
            <Box data={data - 1} ref={boxRef} />
        </article>
    );
}
