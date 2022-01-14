import React from 'react'

function AddClientSante() {
    return (
        <>
          {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='sante'>Avez-vous des problémes de Santé?</label>
                </div>
                <div className="md:w-2/3">    
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='sante' value={''}/>
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='lequels'>Lequels?</label>
                </div>
                <div className="md:w-2/3">    
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='lequels' value={''}/>
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='anesth'>Aves-vous déja eu une anesthésie locale?</label>
                </div>
                <div className="md:w-2/3">    
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='anesth' value={''}/>
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='allergique'>Etes-vous allergique aux pénicilline ou à d'autre médicaments?</label>
                </div>
                <div className="md:w-2/3">    
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='allergique' value={''}/>
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='saigner'>Saigner-vous beaucou aprés coupure ou piqûre</label>
                </div>
                <div className="md:w-2/3">    
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='saigner' value={''}/>
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='enceinte'>Etes vous enceinte?</label>
                </div>
                <div className="md:w-2/3">    
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='enceinte' value={''}/>
                </div>
            </div>
            {/* input end */}
             {/* input start */}
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor='observation'>Observation</label>
                </div>
                <div className="md:w-2/3">    
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' id='observation' value={''}/>
                </div>
            </div>
            {/* input end */}
        </>
    )
}

export default AddClientSante
