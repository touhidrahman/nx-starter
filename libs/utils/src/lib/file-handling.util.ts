export function download(fileName: string, data: any) {
    const blob = new Blob([data], { type: getMimeType(fileName) })
    const objUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.setAttribute('href', objUrl)
    link.setAttribute('target', '_blank')
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

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

export function getMimeType(filePath: string): string {
    const extension = filePath.substring(filePath.lastIndexOf('.'))

    switch (extension) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg'
        case '.png':
            return 'image/png'
        case '.mp3':
            return 'audio/mpeg'
        case '.mp4':
            return 'video/mp4'
        case '.pdf':
            return 'application/pdf'
        case '.docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        case '.xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        case '.pptx':
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        case '.txt':
            return 'text/plain'
        case '.json':
            return 'application/json;charset=utf-8,'
        default:
            return 'nothing'
    }
}
