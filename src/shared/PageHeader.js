import React from 'react';

const PageHeader = ({title, headerActions=null}) => {
  return (
    <>
      <section className="sticky top-0 z-10 bg-secondaryColor px-6 py-2 w-full">
        <div className="flex justify-between">
          <div className="lg:text-2xl text-lg font-bold text-primary md:leading-10 leading-norma">{title}</div>
          <div className="ml-auto">{headerActions && headerActions()}</div>
        </div>
      </section>
    </>
  );
};

export default PageHeader;