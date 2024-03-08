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
