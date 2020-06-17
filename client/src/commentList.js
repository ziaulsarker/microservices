import React, { useEffect, useState } from "react";

function CommentList({ list, ...props }) {
    return (
        <ul>
            {list.map((c) => (
                <li key={c.id}>{c.content}</li>
            ))}
        </ul>
    );
}

export default CommentList;
