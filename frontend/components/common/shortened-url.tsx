import { Copy } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from "sonner"

// Define a type for the link
type LinkType = string;

// Define props for the generic component
interface CopyShortenedLinkProps<T> {
    link: T; // Link of type T
    displayLength: number;
}

const CopyShortenedLink = <T extends LinkType>({ link, displayLength }: CopyShortenedLinkProps<T>) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        const tempInput = document.createElement('textarea');
        tempInput.value = link as string;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);

        toast.info('API URL copied to clipboard!');
    };

    const displayText = (link as string).length > displayLength ? `${(link as string).substring(0, displayLength)}...` : link;

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span onClick={handleCopy} style={{ cursor: 'pointer', marginRight: '8px' }}>
                    {displayText}
                </span>
                <span onClick={handleCopy} style={{ cursor: 'pointer' }}>
                    <Copy size={12} />
                </span>
            </div>
        </div>
    );
};

export default CopyShortenedLink;
