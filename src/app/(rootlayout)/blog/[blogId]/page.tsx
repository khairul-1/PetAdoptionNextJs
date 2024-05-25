import React from "react";

function BlogIdPage({ params }: { params: { blogId: string } }) {
  //   console.log(params);
  return (
    <div>
      BlogIdPage
      <div>{params.blogId}</div>
    </div>
  );
}

export default BlogIdPage;
