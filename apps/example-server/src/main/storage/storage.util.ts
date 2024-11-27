export function getFileType(file: File): 'image' | 'document' | 'audio' | 'video' {
    const extension = file.name.split('.')[1];
    console.log('TCL: | getFileType | extension:', extension)

    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'bmp', 'webp'].includes(extension)) {
        return 'image';
    }

    if (['txt', 'rtf', 'odt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(extension)) {
        return 'document';
    }

    if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'wma', 'm4a'].includes(extension)) {
        return 'audio';
    }

    if (['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm'].includes(extension)) {
        return 'video';
    }

    return 'document';
}
