export function getHashedFileName(file: File) {
    return `${crypto.randomUUID()}.${getFileExtension(file)}`
}

export function getFileExtension(file: File) {
    return file.type.split('/')[1]
}

export function getFileNameFromUrl(url: string) {
    return url.split('/').pop()
}

export function getFileType(
    file: File,
): 'image' | 'document' | 'audio' | 'video' {
    const extension = getFileExtension(file)

    if (
        ['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp', 'webp'].includes(extension)
    ) {
        return 'image'
    }

    if (
        [
            'txt',
            'rtf',
            'odt',
            'pdf',
            'doc',
            'docx',
            'xls',
            'xlsx',
            'ppt',
            'pptx',
        ].includes(extension)
    ) {
        return 'document'
    }

    if (
        ['mp3', 'wav', 'ogg', 'flac', 'aac', 'wma', 'm4a'].includes(extension)
    ) {
        return 'audio'
    }

    if (
        ['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension)
    ) {
        return 'video'
    }

    return 'document'
}
