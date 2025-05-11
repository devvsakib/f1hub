import { useEffect, useState } from 'react';

const GetImage = ({ data, type = 'drivers' }) => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        if (!data?.name) return;

        const folderMap = {
            drivers: 'drivers',
            team: 'teams',
            car: 'cars',
        };

        const folder = folderMap[type] || 'others';
        const fileName = data.name.replaceAll(' ', '-').toLowerCase();
        const filePath = `/assets/${folder}/${folder === 'teams' ? fileName + '-logo' : fileName}.png`;

        const loadImage = () => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = filePath;

                img.onload = () => resolve(filePath);
                img.onerror = () =>
                    resolve(`https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`);
            });
        };

        loadImage().then(setImageSrc);
    }, [type, data]);

    return (
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={data.name}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    );
};

export default GetImage;
