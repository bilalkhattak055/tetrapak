export function formatAccumulatedTime(accumulatedTime) {
    const parts = accumulatedTime.match(/(\d+)\s*minutes?|(\d+)\s*seconds?/g);

    let minutes = 0;
    let seconds = 0;

    if (parts) {
        parts.forEach(part => {
            if (part.includes('minute')) {
                minutes = parseInt(part);
            } else if (part.includes('second')) {
                seconds = parseInt(part);
            }
        });
    }

    return `${minutes}m ${seconds}s`;
}