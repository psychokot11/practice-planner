import { useState, useMemo } from 'react'

export function useFilterByTags(items) {
    const [selectedTags, setSelectedTags] = useState([])
    
    // Extract all unique tags from all items
    const allTags = useMemo(() => {
        if (!items || items.length === 0) return []
        
        const tagSet = new Set()
        items.forEach(item => {
            if (item.tags && Array.isArray(item.tags)) {
                item.tags.forEach(tag => tagSet.add(tag))
            }
        })
        return Array.from(tagSet).sort()
    }, [items])
    
    // Filter items based on selected tags
    const filteredItems = useMemo(() => {
        if (!items) return []
        if (selectedTags.length === 0) return items
        
        return items.filter(item => {
            if (!item.tags || !Array.isArray(item.tags)) return false
            
            // Item must have ALL selected tags
            return selectedTags.every(selectedTag => 
                item.tags.includes(selectedTag)
            )
        })
    }, [items, selectedTags])
    
    // Get tags that are incompatible with current selection
    const getIncompatibleTags = useMemo(() => {
        if (selectedTags.length === 0) return []
        
        const compatibleTags = new Set()
        
        // Find all items that contain ALL currently selected tags
        const compatibleItems = items?.filter(item => {
            if (!item.tags || !Array.isArray(item.tags)) return false
            return selectedTags.every(selectedTag => 
                item.tags.includes(selectedTag)
            )
        }) || []
        
        // Collect all tags from compatible items
        compatibleItems.forEach(item => {
            item.tags.forEach(tag => compatibleTags.add(tag))
        })
        
        // Return tags that are not in any compatible items
        return allTags.filter(tag => !compatibleTags.has(tag))
    }, [items, selectedTags, allTags])
    
    const handleTagToggle = (tagName) => {
        setSelectedTags(prev => {
            if (prev.includes(tagName)) {
                return prev.filter(tag => tag !== tagName)
            } else {
                return [...prev, tagName]
            }
        })
    }
    
    const clearFilters = () => {
        setSelectedTags([])
    }
    
    return {
        selectedTags,
        allTags,
        filteredItems,
        incompatibleTags: getIncompatibleTags,
        handleTagToggle,
        clearFilters,
        hasActiveFilters: selectedTags.length > 0
    }
}